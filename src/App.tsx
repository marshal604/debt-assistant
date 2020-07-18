import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.scss';

import LoginPage from 'src/auth/containers/LoginPage/LoginPage';
import GroupList from 'src/group/containers/GroupList/GroupList';
import UserPage from 'src/auth/containers/UserPage/UserPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App px-3 px-md-0">
        <Route path="/" exact render={() => <div>Home</div>}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/group/:id" component={GroupList}></Route>
        <Route path="/user" component={UserPage}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
