import { useEffect, useMemo, useState } from "react";
import { cn } from "../lib/utils";

export default function SideNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? null);

  const ids = useMemo(() => sections.map((s) => s.id), [sections]);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el) => Boolean(el));

    if (elements.length === 0) return;

    const handleInitial = () => {
      const byTop = [...elements].sort((a, b) => Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top))[0];
      if (byTop?.id) setActive(byTop.id);
    };

    handleInitial();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target && visible.target.id) {
          setActive(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const onClick = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  };

  return (
    <nav
      aria-label="Secciones"
      className="hidden md:flex fixed bg-[#F4E9D7] left-0 top-25 bottom-25 z-70 w-auto min-w-[180px] max-w-[220px] px-3"
    >
      <div className="h-full rounded-r-lg border-r border-b border-t border-[#072D42]/10 bg-white/90 backdrop-blur-md p-4 flex-1">
        <ul className="flex flex-col gap-2">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="flex">
                <a 
                  href={`#${s.id}`} 
                  onClick={onClick(s.id)} 
                  className="group block flex-1"
                >
                  <div
                    className={cn(
                      "rounded-lg p-[1px] transition-all w-full",
                      isActive
                        ? "bg-[#072D42]"
                        : "bg-transparent group-hover:bg-[#072D42]/10"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-md px-3 py-2 transition-all w-full",
                        isActive 
                          ? "bg-white border-l-4 border-[#072D42]" 
                          : "bg-transparent group-hover:bg-white/50"
                      )}
                    >
                      <span className="relative inline-flex items-center gap-2 w-full">
                        <span
                          className={cn(
                            "font-medium text-sm flex-1 transition-colors",
                            isActive
                              ? "text-[#072D42] font-semibold"
                              : "text-[#072D42]/70 group-hover:text-[#072D42]"
                          )}
                        >
                          {s.label}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            "absolute -bottom-1 left-0 h-0.5 rounded-full transition-all",
                            isActive
                              ? "w-full bg-[#072D42]"
                              : "w-0 bg-[#072D42] group-hover:w-full"
                          )}
                        />
                      </span>
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}