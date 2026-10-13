import { useEffect } from 'react';
import './index.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/skills';
import Works from './sections/Works';
import Now from './sections/Now';
import Contact from './sections/contact';

/* La luz del fondo sigue al mouse. Es solo decoración: quien pidió menos
   movimiento la ve fija. */
function useLuzDelMouse() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const alMover = (e) => {
            const raiz = document.documentElement.style;
            raiz.setProperty('--mx', `${e.clientX}px`);
            raiz.setProperty('--my', `${e.clientY}px`);
        };

        window.addEventListener('pointermove', alMover, { passive: true });
        return () => window.removeEventListener('pointermove', alMover);
    }, []);
}

function App() {
    useLuzDelMouse();

    return (
        <>
            <a href="#contenido" className="saltar">Saltar al contenido</a>
            <Nav />
            <main id="contenido">
                <Hero />
                <About />
                <Skills />
                <Works />
                <Now />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;
