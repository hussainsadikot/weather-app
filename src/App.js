import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CityTable from './CityTable';
import WeatherPage from './WeatherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather/:cityId" element={<WeatherPage />} />
        <Route path="/" element={<CityTable />} />
      </Routes>
    </Router>
  );
}

export default App;
