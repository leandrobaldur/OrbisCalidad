import React from 'react';
import { Link } from 'react-router-dom';

// Componente para los íconos de redes sociales
const SocialIcons = () => {
    return (
        <div className="flex justify-center gap-5"> {/* Aumentado el gap para los iconos más grandes */}
            {/* Rutas de las imágenes: public/media/footer/ */}
            {/* Asegúrate de que estos archivos PNG existan en public/media/footer/ */}
            <a href="https://www.facebook.com/TuPaginaDeFacebook" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200">
                <img src="/media/footer/facebook_icon.png" alt="Facebook" className="w-8 h-8" /> {/* Iconos más grandes: w-8 h-8 */}
            </a>
            <a href="https://www.instagram.com/TuCuentaDeInstagram" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200">
                <img src="/media/footer/instagram_icon.png" alt="Instagram" className="w-8 h-8" /> {/* Iconos más grandes: w-8 h-8 */}
            </a>
            <a href="https://www.tiktok.com/@TuCuentaDeTikTok" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-200">
                <img src="/media/footer/tik_tok_icon.png" alt="TikTok" className="w-8 h-8" /> {/* Iconos más grandes: w-8 h-8 */}
            </a>
        </div>
    );
};

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-yellow-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 py-3 mt-auto shadow-inner transition-colors duration-300 font-sans overflow-hidden"> {/* py-3 para reducir la altura total */}
            {/* Imagen de fondo del footer */}
            {/* Ruta: public/media/footer/footer2.png */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-20 z-0"
                style={{ backgroundImage: "url('/media/footer/footer2.png')" }}
            ></div>

            <div className="relative z-10 max-w-lg mx-auto px-4 text-lg font-medium tracking-wide"> {/* text-lg para un texto base más grande */}

                {/* Copyright */}
                <p className="text-neutral-700 dark:text-neutral-300 text-center mb-4 leading-snug text-base"> {/* text-base para copyright */}
                    © {currentYear} Repositorio Bicentenario de Bolivia. Todos los derechos reservados.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-12 sm:gap-24 mb-4"> {/* Ajustado gap y mb para distribución */}

                    {/* Columna Izquierda: Navegación */}
                    <div className="text-center">
                        <h3 className="text-neutral-800 dark:text-neutral-100 font-semibold mb-3 text-lg uppercase"> {/* text-lg para título */}
                            Navegación
                        </h3>
                        <ul className="space-y-3 text-base"> {/* text-base y space-y para enlaces */}
                            <li><Link to="/acerca-de" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Acerca de</Link></li>
                            <li><Link to="/mas-de-nosotros" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Más de Nosotros</Link></li>
                            <li><Link to="/contacto" className="text-neutral-600 dark:text-neutral-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Columna Derecha: Solo Íconos de Redes Sociales */}
                    <div className="flex flex-col items-center justify-center pt-3"> {/* pt-3 para alinear verticalmente */}
                        <SocialIcons />
                    </div>

                </div>

                {/* Línea divisoria */}
                <div className="w-2/3 mx-auto border-t border-neutral-300 dark:border-neutral-600 my-3"></div> {/* my-3 para compactar */}

                {/* Cita final */}
                <p className="text-center text-base text-neutral-500 dark:text-neutral-500 tracking-wide italic mb-1"> {/* text-base para la cita */}
                    “Conocer nuestra historia es entender nuestro presente.”
                </p>

                {/* Crédito de Alberto Navarro */}
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 tracking-wide"> {/* text-sm para el crédito, discreto pero más grande */}
                    Titulizado por Alberto Navarro
                </p>
            </div>
        </footer>
    );
}

export default Footer;