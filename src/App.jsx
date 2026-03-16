import React from 'react';
import Header from './components/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>Dashboard Content</h2>
        <p>Welcome to the ProcureAI management interface.</p>
      </main>
    </div>
  );
};

export default App;
