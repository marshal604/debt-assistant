import React, { FunctionComponent } from 'react';

import { PageProps } from './Page.model';
import Footer from 'src/shared/layout/Footer/Footer';

const Page: FunctionComponent<PageProps> = props => {
  return (
    <React.Fragment>
      {props.central ? (
        <div className="d-flex h-100 flex-column">
          <div className="row flex-grow-1 justify-content-center align-items-center">
            <div className="col-12 col-lg-10 col-xl-8">{props.children}</div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="d-flex flex-column h-100">
          <div className="flex-grow-1">{props.children}</div>
          <div className="w-100">
            <Footer />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
