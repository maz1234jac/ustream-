import React from 'react';
import CreatorView from './pages/CreatorView';
import ConsumerView from './pages/ConsumerView';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Media Share App</h1>
      <CreatorView />
      <ConsumerView />
    </div>
  );
}

export default App;
