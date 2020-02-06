import React from 'react';
import './styles/style.css';
import { HashRouter, Route } from 'react-router-dom';
import Films from './Films';
import OpenedFilm from './OpenedFilm';

function App() {

  return (
      <HashRouter>
        <Route path="/" exact>
          <Films />
        </Route>
        <Route path='/film'>
          <OpenedFilm />
        </Route>
      </HashRouter>
  );
}

export default App;
