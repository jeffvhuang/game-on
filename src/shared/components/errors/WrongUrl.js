import React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';

function WrongUrl() {
  return (
    <div className="mid-container">
      <div className="mid-flex">
        <h1>...Oops</h1>
      </div>
      <div className="section">
        <p>There doesn't seem to be a page that matches: {window.location.href}</p>
        <p>Try checking your url or you can start browsing from the
          <Link to={paths.LANDING}> home page</Link>.
        </p>
      </div>
    </div>
  );
}

export default WrongUrl;