import React, { Context } from 'react';
interface LoadingContextModel {
  loading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}

const loadingContext: Context<LoadingContextModel> = React.createContext<LoadingContextModel>({
  loading: false,
  startLoading: () => {},
  finishLoading: () => {}
});

export default loadingContext;
