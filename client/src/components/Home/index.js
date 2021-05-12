import {useEffect} from 'react';

import './index.scss';
import logo from '../../assets/images/logo_small.png';
import addExercise from '../../assets/images/addexercises.png';
import chartexercise from '../../assets/images/chartexercise.png';
import createexercise from '../../assets/images/createexercise.png';

import RegisterForm from '../../containers/RegisterForm';
import LoginForm from '../../containers/LoginForm';
import Footer from '../Footer';

const Home = ({ fetchPrivateData, setRedirect }) => {

  useEffect(() => {
    if(localStorage.getItem('authToken')) {
      fetchPrivateData()
    }
  }, [fetchPrivateData]);

  useEffect(() => {
      setRedirect(false);
  }, [setRedirect]);

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <div className="home-header">
          <a href="/">
            <img src={logo} alt=""/>
          </a>
          <h2>Train as Hard as you Can</h2>
        </div>
        <div className="home-content">
          <p className="home-content-subtitle">Track Your Perfs | Keep Improvments | See Results</p>
          <div className="backgroundimg">
            <h1>Give the best of you every day</h1>
          </div>
          <div className="home-subcontentforms">
            <h1 className="home-subcontentforms-title">Join us</h1>
            <div className="home-subcontentforms-forms">
              <RegisterForm />
              <LoginForm />
            </div>
          </div>
          <div className="home-tuto">
            <div className="home-tuto-content first">
              <div>
                <p>
                  <span>1</span>
                  Create as much exercise as you want
                </p>
                <img src={createexercise} alt=""/>
              </div>
            </div>
            <div className="home-tuto-content second">
              <div>
                <p>
                  <span>2</span>
                  Create trainings and use exercises you created before
                </p>
                <img src={addExercise} alt=""/>
              </div>
            </div>
            <div className="home-tuto-content third">
              <div>
                <p>
                  <span>3</span>
                  Track your perfs and improvments for each exercises
                </p>
                <img src={chartexercise} alt=""/>
              </div>
            </div>
          </div>
          <div className="home-infos">
            <p>
              STRENGHT KEEPER will help you to keep tracking your perfs for bodyweight or weighted workout exercises. <br/>
              This app is far from perfect, it's first a training web devlopment project,<br/> and this is actually the very first version of the app !<br/>
              There is a lot that can be improve, and i'll try to work on it as much as i can.
            </p>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;