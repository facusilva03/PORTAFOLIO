import Sidebar from './components/sidebar';
import './index.css';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/skills.jsx';
import Works from './sections/Works.jsx';
import Services from './sections/services.jsx';

function App() {
  return (
    <div className="app-root">
      <Sidebar />

      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Works />
      </main>
    </div>
  );
}

export default App;
