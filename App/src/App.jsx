import { useState } from 'react';
import Empresa from './Views/empresa/empresa.jsx';
import Licitador from './Views/licitador/licitador.jsx';
import Login from './Views/login/login.jsx';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route path="/licitador" element={<Licitador />} />
      </Routes>
    </Router>
  );
}

export default App;
