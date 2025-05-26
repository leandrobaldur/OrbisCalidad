import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const PanelEditorUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState("");
  const [nuevaContrasenia, setNuevaContrasenia] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const ROL_NOMBRE = {
    1: "Administrador",
    2: "Colaborador"
  };

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) throw new Error("Error al obtener usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f2f0df] p-6 flex flex-col items-center">
      <h1 className="text-3xl text-[#9fa56c] font-bold font-mono tracking-wide mb-8">Panel de edición</h1>

      <div className="bg-[#202020] w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#2b2b2b] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#e1e4c5] text-lg">DATOS</span>
        </div>

        <div className="px-6 pb-4 flex justify-end">
          <button
            className="bg-[#9fa56c] text-white p-3 rounded-full text-sm font-semibold hover:bg-[#8a944e] transition"
            onClick={() => setMostrarModal(true)}
          >
            ➕
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-6">
          {usuarios.map((usuario, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-black shadow-md flex flex-col justify-center items-start"
            >
              <span className="text-[#2b2b2b] font-semibold text-lg">Usuario</span>
              <input
                type="text"
                value={usuario.usuario}
                disabled
                className="w-full mt-2 mb-3 p-2 rounded-md bg-[#e1e4c5] text-black"
              />
              <span className="text-[#2b2b2b] font-semibold text-lg">Rol</span>
              <input
                type="text"
                value={ROL_NOMBRE[usuario.id_rol] || "Desconocido"}
                disabled
                className="w-full mt-2 p-2 rounded-md bg-[#e1e4c5] text-black"
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#F6EEE3] p-6 rounded-xl shadow-xl w-[90vw] max-w-md relative"
          >
            <h2 className="text-xl font-bold text-[#000] mb-4 text-center">Registrar nuevo colaborador</h2>

            {mensaje && (
              <div className="mb-3 text-sm text-center text-red-600 font-medium">{mensaje}</div>
            )}

            <input
              type="text"
              placeholder="Nombre de usuario"
              className="w-full p-2 mb-4 rounded-md border border-[#D0D0D0] text-black"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 mb-4 rounded-md border border-[#D0D0D0] text-black"
              value={nuevaContrasenia}
              onChange={(e) => setNuevaContrasenia(e.target.value)}
            />

            <div className="flex justify-between gap-4">
              <button
                onClick={() => {
                  setMostrarModal(false);
                  setNuevoUsuario("");
                  setNuevaContrasenia("");
                  setMensaje(null);
                }}
                className="flex-1 bg-[#999] text-white py-2 rounded-md hover:bg-[#777]"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  if (!nuevoUsuario || !nuevaContrasenia) {
                    setMensaje("Completa todos los campos.");
                    return;
                  }

                  try {
                    const response = await fetch('http://localhost:3000/usuarios/registro', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        usuario: nuevoUsuario,
                        contrasenia: nuevaContrasenia,
                        id_usuario: 1
                      })
                    });

                    const data = await response.json();

                    if (!response.ok) {
                      setMensaje(data.message || "Error al registrar");
                      return;
                    }

                    setMensaje("Usuario creado exitosamente");
                    setTimeout(() => {
                      setMostrarModal(false);
                      setNuevoUsuario("");
                      setNuevaContrasenia("");
                      setMensaje(null);
                      // recargar lista
                      fetch('http://localhost:3000/usuarios')
                        .then(res => res.json())
                        .then(setUsuarios)
                        .catch(err => console.error("Error al recargar usuarios:", err));
                    }, 1000);
                  } catch (err) {
                    console.error("Error:", err);
                    setMensaje("Error al conectar con el servidor");
                  }
                }}
                className="flex-1 bg-[#166D3B] text-white py-2 rounded-md hover:bg-[#145b31]"
              >
                Registrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PanelEditorUsuarios;