import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthGuard from 'src/routers/AuthGuard';
import Loader from 'src/shared/layout/Loader/Loader';
import Firebase from './shared/utils/firebase-register';
import 'src/helper/i18n/i18n';

Firebase.init();
ReactDOM.render(
  <React.StrictMode>
    <Loader>
      <AuthGuard>
        <App />
      </AuthGuard>
    </Loader>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
