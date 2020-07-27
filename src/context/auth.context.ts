import React, { Context } from 'react';

interface AuthContextModel {
  authorized: boolean;
  checkAuth$: () => Promise<void>;
}

const authContext: Context<AuthContextModel> = React.createContext<AuthContextModel>({
  authorized: false,
  checkAuth$: () => Promise.resolve()
});

export default authContext;
