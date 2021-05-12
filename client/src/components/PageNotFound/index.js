import {Link} from 'react-router-dom';

import './index.scss';
import gif from '../../assets/images/pushupsgif.gif';
import logo from '../../assets/images/logo_small.png';

const PageNotFound = () => {
  return (
    <div className="notfoundr">
      <div className="notfound-wrapper">
        <div className="notfound-wrapper-header">
          <a href="/">
            <img src={logo} alt=""/>
          </a>
          <h2>Train as Hard as you Can</h2>
        </div>
        <div className="notfound-wrapper-content">
          <p>404 NOT FOUND</p>
          <img src={gif} alt=""/>
        </div>
        <div className="notfound-wrapper-link">
          <Link to="/">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
};


export default PageNotFound;