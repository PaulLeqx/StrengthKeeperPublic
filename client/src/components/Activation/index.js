import {useEffect} from 'react';
import PropTypes from 'prop-types'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom';
import './index.scss';

const Activation = ({handleValidationEmail}) => {

  const {activationToken} = useParams();
  useEffect(() => {
    handleValidationEmail(activationToken);
  }, []);

  return (
    <div className="activation-container">
      <div className="activation-wrapper">
        <div>
          <p>Account Verified</p>
        </div>
        <Link to="/">You can now use StrenghtKeeper</Link>
      </div>
    </div>
  );
};

Activation.propTypes = {
  handleValidationEmail: PropTypes.func.isRequired,
}

export default Activation;