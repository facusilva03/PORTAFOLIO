import Sidebar from './components/sidebar';
import './index.css';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';

function App() {
  return (
    <div className="app-root">
      <Sidebar />

      <main className="main-content">
        <Hero />
        <About />
      </main>
    </div>
  );
}

export default App;