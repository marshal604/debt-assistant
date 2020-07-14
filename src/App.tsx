import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.scss';

import LoginPage from './auth/login/containers/LoginPage/LoginPage';
import GroupList from 'src/group/list/containers/GroupList/GroupList';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact render={() => <div>Home</div>}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/group/:id" component={GroupList}></Route>
    </BrowserRouter>
  );
}

export default App;
