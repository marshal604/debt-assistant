import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import FooterLogo from 'src/assets/logo/footer-logo.jpg';
import './Footer.scss';
const Footer: FunctionComponent = props => {
  const lang = navigator.language.includes('en') ? 'en' : 'tw';
  return (
    <React.Fragment>
      <hr />
      <div className="Footer row justify-content-between mb-2 mb-md-0">
        <div className="col-12 col-md d-flex justify-content-start justify-content-md-start">
          <ul>
            <li>
              <i className="far fa-envelope"></i>
              <span className="ml-2">marshal604@gmail.com</span>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://marshal604@github.com">
                <i className="fab fa-github"></i>
                <span className="ml-2">marshal604@github.com</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="col col-md mt-3 mt-md-0 d-flex align-items-center justify-content-start justify-content-md-center">
          <img src={FooterLogo} alt="me" />
          <span className="ml-2 text-nowrap">© 2020 by Hubert</span>
        </div>
        <div className="col col-md mt-3 mt-md-0 d-flex align-items-center justify-content-end">
          <Link to={`/privacy/${lang}`}>Privacy</Link>
          <span className="mx-3"> & </span>
          <Link to={`/terms/${lang}`}>Terms</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
