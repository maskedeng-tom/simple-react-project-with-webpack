import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Simple React App with webpack!</h1>;
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
