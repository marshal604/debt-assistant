import React, { Component } from 'react';

import LoadingContext from 'src/context/loading.context';
import Mask from 'src/shared/layout/Mask/Mask';
import Logo from 'src/assets/logo/footer-logo.jpg';
import './Loader.scss';
import HttpClient from 'src/helper/httpClient/httpClient';
class Loader extends Component {
  state = {
    loading: this.context.loading
  };

  componentDidMount() {
    HttpClient.intercept.request = () => {
      this.startLoading();
    };
    HttpClient.intercept.response = () => {
      this.finishLoading();
    };
    HttpClient.intercept.error = () => {
      this.finishLoading();
    };
  }

  startLoading = () => {
    if (this.state.loading === true) {
      return;
    }
    this.setState({
      loading: true
    });
  };

  finishLoading = () => {
    if (this.state.loading === false) {
      return;
    }
    this.setState({
      loading: false
    });
  };

  static contextType = LoadingContext;
  context!: React.ContextType<typeof LoadingContext>;
  render() {
    return (
      <LoadingContext.Provider value={{ loading: this.state.loading, startLoading: this.startLoading, finishLoading: this.finishLoading }}>
        {this.state.loading ? (
          <Mask>
            <div className="Loading">
              <img src={Logo} alt="spinner" />
            </div>
          </Mask>
        ) : null}
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}

export default Loader;
