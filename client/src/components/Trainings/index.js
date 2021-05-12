import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

import {useEffect} from 'react';
import './index.scss';

import Header from '../Header';
import Training from "../../containers/TrainingList";

const Dashboard = ({ 
  trainings, 
  resetRedirect, 
  fetchPrivateData,
}) => {
  
  useEffect(() => {
    resetRedirect(false);
    fetchPrivateData();
  }, [resetRedirect, fetchPrivateData]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        <div className="home-header">
          <Header />
        </div>
        <div className="dashboard-content">
          <Link to="/dashboard/trainings/create"><span>+</span>Add Training</Link>
          {trainings.map((training) => {
            return (
              <Training 
                key={training._id}
                name={training.name} 
                exercises={training.exercise} 
                id={training._id} 
              />
            )
          }).reverse()}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  trainings: PropTypes.array.isRequired,
  resetRedirect: PropTypes.func.isRequired, 
  fetchPrivateData: PropTypes.func.isRequired
}

export default Dashboard;