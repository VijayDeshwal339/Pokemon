import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import Header from "./components/Header";
import Favorites from './pages/Favorites';
import PokemonProvider from './contexts/PokemonContext';
import ErrorBoundary from './components/ErrorBoundary';
import PokemonComparison from './components/PokemonComparison';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<PokemonComparison />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </PokemonProvider>
  );
}

export default App;

