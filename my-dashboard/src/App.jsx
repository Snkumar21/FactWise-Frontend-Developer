import React from 'react';
import FactWiseDashboard from './components/FactWiseDashboard';

// Import AG Grid CSS
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {
  return (
    <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
      <FactWiseDashboard />
    </div>
  );
}

export default App;