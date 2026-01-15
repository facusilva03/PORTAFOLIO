import Sidebar from './components/sidebar';
import './index.css';
import Hero from './sections/hero.jsx';

function App() {
  return (
    <div className="app-root">
      <Sidebar />

      <main className="main-content">
        <Hero />
      </main>
    </div>
  );
}

export default App;