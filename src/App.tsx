import React from 'react';
import PriceChart from './components/PriceChart';
import './App.css';
const App: React.FC = () => {
  return (
    <div className="App-header" style={{ width: '100%', height: '100%' }}>
      <PriceChart />
    </div>
  );
};

export default App;
