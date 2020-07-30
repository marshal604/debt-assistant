import React, { FunctionComponent } from 'react';

import { PageProps } from './Page.model';
import './Page.scss';
import Footer from 'src/shared/layout/Footer/Footer';

const Page: FunctionComponent<PageProps> = props => {
  return (
    <React.Fragment>
      {props.central ? (
        <div className="Page d-flex h-100 flex-column p-3">
          <div className="row flex-grow-1 justify-content-center align-items-center">
            <div className="col-12 col-lg-10 col-xl-8">{props.children}</div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="Page d-flex flex-column h-100 p-3">
          <div className="flex-grow-1">{props.children}</div>
          <div className="w-100"></div>
          <Footer />
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
