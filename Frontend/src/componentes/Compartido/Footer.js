import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white text-center py-4 mt-auto">
            <div>
                <p>&copy; {new Date().getFullYear()} Punto Shein. Todos los derechos reservados.</p>
                <p>
                    <a href="/terms" className="text-blue-400 hover:underline">Términos y Condiciones</a> | 
                    <a href="/privacy" className="text-blue-400 hover:underline ml-2">Política de Privacidad</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
