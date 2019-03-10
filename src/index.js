import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './index.less';
import App from './Components/App/App';
import Settings from './Resources/Settings';

ReactDOM.render(
  <BrowserRouter>
    <div className="height-100">
      <Switch>
        <Route exact path="/" render={() => <App namePage={Settings.getSettings('filmsLink')} />} />
        <Route
          path={`/${Settings.getSettings('peopleLink')}`}
          render={() => <App namePage={Settings.getSettings('peopleLink')} />}
        />
        <Route
          path={`/${Settings.getSettings('filmsLink')}`}
          render={() => <App namePage={Settings.getSettings('filmsLink')} />}
        />
        <Route
          path={`/${Settings.getSettings('starshipsLink')}`}
          render={() => <App namePage={Settings.getSettings('starshipsLink')} />}
        />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

/*
  <BrowserRouter>
    <div className="height-100">
      <Switch>
        <Route exact path="/" render={() => <App namePage={Settings.getSettings('filmsLink')} />} />
        <Route
          path={`/${Settings.getSettings('peopleLink')}`}
          render={() => <App namePage={Settings.getSettings('peopleLink')} />}
        />
        <Route
          path={`/${Settings.getSettings('filmsLink')}`}
          render={() => <App namePage={Settings.getSettings('filmsLink')} />}
        />
        <Route
          path={`/${Settings.getSettings('starshipsLink')}`}
          render={() => <App namePage={Settings.getSettings('starshipsLink')} />}
        />
      </Switch>
    </div>
  </BrowserRouter>
*/
