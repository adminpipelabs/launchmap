import { Routes, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import Scan from './routes/Scan';
import Results from './routes/Results';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/scan" element={<Scan />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}
