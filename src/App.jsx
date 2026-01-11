// src/App.jsx
import Sidebar from './components/Sidebar';
import Hero from './sections/Hero';

function App() {
  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Barra lateral fija: 20% del ancho aprox */}
      <Sidebar />

      {/* Contenido principal: 80% del ancho */}
      <main className="flex-1 ml-[20%] relative">
        <Hero />
      </main>
    </div>
  );
}

export default App;