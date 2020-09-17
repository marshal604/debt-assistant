import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AuthGuard from 'src/routers/AuthGuard';
import Loading from 'src/shared/layout/Loading/Loading';
import Firebase from './shared/utils/firebase-register';

Firebase.init();

ReactDOM.render(
  <React.StrictMode>
    <Loading>
      <AuthGuard>
        <App />
      </AuthGuard>
    </Loading>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
