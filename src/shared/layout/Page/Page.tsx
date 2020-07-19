import React, { FunctionComponent } from 'react';

import { PageProps } from './Page.model';

const Page: FunctionComponent<PageProps> = props => {
  return (
    <React.Fragment>
      {props.central ? (
        <div className="position-relative h-100 row justify-content-center align-items-center">
          <div className="col-12">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8">{props.children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">{props.children}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Page;
