import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import FooterLogo from 'src/assets/logo/footer-logo.jpg';
import './Footer.scss';
const Footer: FunctionComponent = props => {
  // const lang = navigator.language.includes('en') ? 'en' : 'tw';
  const lang = 'tw';
  return (
    <React.Fragment>
      <hr />
      <div className="Footer row justify-content-between mb-1 mb-md-0">
        <div className="col d-flex justify-content-start justify-content-md-start">
          <a className="d-flex align-items-center" href="mailto:marshal604@gmail.com">
            <i className="far fa-envelope"></i>
          </a>
          <a
            className="d-flex align-items-center ml-3"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/marshal604/debt-assistant"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
        <div className="col d-flex align-items-center justify-content-start justify-content-md-center">
          <img src={FooterLogo} alt="me" />
          <span className="ml-2 text-nowrap">
            <small className="font-weight-bold">© 2020 by Hubert</small>
          </span>
        </div>
        <div className="col mt-3 mt-md-0 d-flex align-items-center justify-content-end">
          <Link to={`/privacy/${lang}`}>
            <small>Privacy</small>
          </Link>
          <span className="mx-3"> </span>
          <Link to={`/terms/${lang}`}>
            <small>Terms</small>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
