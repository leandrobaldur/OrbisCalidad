import React, { useMemo, useState } from "react";

const ContenedorLateral = ({
  subtitulo,
  imagen,
  ancho,
  alto,
  ovaloRedondez,
  cuadroRedondez,
  dias,
}) => {
  // Construye días por defecto: hoy, mañana y pasado
  const defaultDias = useMemo(() => {
    const base = new Date();
    const toISODate = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    };
    const d1 = new Date(base);
    const d2 = new Date(base); d2.setDate(base.getDate() + 1);
    const d3 = new Date(base); d3.setDate(base.getDate() + 2);
    return [
      { label: "Día 1", date: toISODate(d1), imageUrl: imagen },
      { label: "Día 2", date: toISODate(d2), imageUrl: imagen },
      { label: "Día 3", date: toISODate(d3), imageUrl: imagen },
    ];
  }, [imagen]);

  const diasData = dias && Array.isArray(dias) && dias.length === 3 ? dias : defaultDias;

  // Selecciona el día según la fecha actual
  const todayISO = useMemo(() => {
    const t = new Date();
    const y = t.getFullYear();
    const m = String(t.getMonth() + 1).padStart(2, "0");
    const d = String(t.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }, []);

  const initialIndex = Math.max(0, diasData.findIndex((d) => d.date === todayISO));
  const [activeIdx, setActiveIdx] = useState(initialIndex === -1 ? 0 : initialIndex);

  const getStatus = (dateISO) => {
    if (dateISO === todayISO) return "Hoy";
    return dateISO < todayISO ? "Realizado" : "Próximamente";
  };

  return (
    <div
      className="relative flex flex-col z-10 ml-auto bg-white shadow-sm"
      style={{
        width: ancho,
        height: alto,
        borderColor: "#E5E7EB",
        borderWidth: "1px",
        borderStyle: "solid",
        borderRadius: cuadroRedondez,
        marginTop: "clamp(0rem, 3vh, 2rem)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="px-4 md:px-6 lg:px-8 py-3 md:py-4"
        style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}
      >
        <h2 className="font-playfair font-medium text-primary text-2xl md:text-3xl text-center tracking-tight">
          {subtitulo || "Semana de actividades"}
        </h2>
      </div>

      {/* Selector de días */}
      <div className="px-3 md:px-6 lg:px-8 py-3">
        <div className="flex gap-1 md:gap-2 rounded-full border" style={{ borderColor: '#E5E7EB', backgroundColor: '#FFFFFF', padding: '6px' }}>
          {diasData.map((d, idx) => {
            const status = getStatus(d.date);
            const isActive = idx === activeIdx;
            return (
              <button
                key={d.label}
                onClick={() => setActiveIdx(idx)}
                className={`group flex-1 flex flex-col items-center justify-center rounded-full transition-colors duration-200 focus:outline-none py-2 md:py-2.5`}
                style={
                  isActive
                    ? { backgroundColor: 'rgba(7,45,66,0.08)', color: '#072D42' }
                    : { backgroundColor: '#FFFFFF', color: '#111827' }
                }
                aria-pressed={isActive}
              >
                <span className={`font-miles text-xs md:text-sm`}>{d.label}</span>
                <span className="mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] md:text-xs border font-miles font-light"
                  style={
                    status === 'Hoy'
                      ? { backgroundColor: 'rgba(7,45,66,0.08)', color: '#072D42', borderColor: 'rgba(7,45,66,0.18)' }
                      : status === 'Realizado'
                      ? { backgroundColor: '#F3F4F6', color: '#374151', borderColor: '#E5E7EB' }
                      : { backgroundColor: '#F9FAFB', color: '#4B5563', borderColor: '#E5E7EB' }
                  }
                >
                  {status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-2 md:px-4 lg:px-6 pb-4 flex items-center justify-center">
        <div className="relative w-full max-w-[760px] h-full flex items-start justify-center">
          <div className="relative mt-4 w-[min(95%,680px)] h-[min(62%,440px)] md:w-[min(94%,720px)] md:h-[min(66%,500px)] lg:w-[min(93%,760px)] lg:h-[min(68%,540px)] overflow-hidden rounded-xl bg-white shadow-sm"
               style={{ border: '1px solid #E5E7EB' }}>
            <img
              src={diasData[activeIdx]?.imageUrl || imagen}
              alt={`${diasData[activeIdx]?.label || "Día"} - imagen`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContenedorLateral;

