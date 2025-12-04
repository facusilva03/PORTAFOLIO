
// src/App.jsx

import React from 'react';
// Aquí pondremos estilos o librerías que necesitemos

function App() {
  return (
    // <> y </> son Fragments, que permiten devolver múltiples elementos
    // sin crear un <div> extra en el DOM.
    <> 
        {/* Componente Header */}
        <header className="fixed w-full z-10">
            {/* Aquí irá el menú de navegación (Inicio, Proyectos, Contacto) */}
        </header>

        {/* Componente Main (donde se carga el contenido) */}
        <main>
            {/* 💥 Componente Hero (Tu presentación) 💥 */}
            <section className="h-screen flex items-center justify-center bg-gray-100">
                <h1>Hola, soy Facundo Silva. Desarrollador Web.</h1>
            </section>
        </main>

        {/* Componente Footer */}
        <footer>
            <div className="text-center py-4 bg-gray-800 text-white">
                &copy; {new Date().getFullYear()} Facundo Silva.
            </div>
        </footer>
    </>
  );
}

export default App;