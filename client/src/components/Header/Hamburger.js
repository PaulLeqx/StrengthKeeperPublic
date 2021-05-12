import {Link} from 'react-router-dom';
import {useEffect, useRef} from "react";
import gsap from 'gsap';
import './index.scss';

import github from '../../assets/images/github.png';
import linkedin from '../../assets/images/linkedin.png';

const Hamburger = ({state, deleteAccount}) => {
  let menu = useRef(null);
  let revealMenu = useRef(null);
  let revealMenuBackground = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let line4 = useRef(null);
  let info = useRef(null);

  const handleDeleteAccount = () => {
    deleteAccount();
  }

  useEffect(() => {
    if(state.clicked === false) {
      // close Menu
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0.8,
        height: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.07
        }
      });
      gsap.to(menu, {
        duration: 1,
        css: { display: 'none' }
      })
    } else if (
      state.clicked === true || 
      state.clicked === true && state.initial === null
    ) {
      //Open menu
      gsap.to(menu, {
        duration: 0,
        css: { display: 'block' }
      });
      gsap.to([revealMenu, revealMenuBackground], {
        duration: 0,
        opacity: 1,
        height: "100%",
      });
      staggerReveal(revealMenuBackground, revealMenu);
      fadeInUp(info);
      staggerText(line1, line2, line3, line4);
    }
  }, [state]);

  const staggerReveal = (node, node2) => {
    gsap.from([node, node2], {
      duration: .8,
      height: 0,
      transformOrigin: 'right top',
      skewY: 2,
      ease: "power3.inOut",
      stagger: {
        amount: 0.1,
      }
    });
  };

  const staggerText = (node, node2, node3, node4) => {
    gsap.from([node, node2, node3, node4], {
      duration: .8,
      y: 100,
      delay: .1,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.3,
      }
    });
  };

  const fadeInUp = node => {
    gsap.from(node, {
      y: 60,
      duration: 1,
      delay: .2,
      opacity: 0,
      ease: 'power3.inOut',
    });
  };

  const handleHover = e => {
    gsap.to(e.target, {
      duration: .3,
      y: 3,
      skewX: 4,
      ease: "power3.inOut"
    });
  };

  const handleHoverExit = e => {
    gsap.to(e.target, {
      duration: .3,
      y: -3,
      skewX: 0,
      ease: "power3.inOut"
    });
  }

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
  };

  return (
  <div 
    ref={el => (menu = el)} 
    className='hamburger-menu'
  >
    <div 
      ref={el => (revealMenuBackground = el)} 
      className="menu-secondary-background-color"
    >
    </div>
    <div ref={el => (revealMenu = el)} className="menu-layer">
      <div className="container">
        <div className="wrapper">
          <div className="menu-links">
            <nav>
              <ul>
                <li>
                  <Link 
                    ref={el => (line1 = el)} 
                    to="/dashboard"
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                  >
                    EXERCISES
                  </Link>
                </li>
                <li>
                  <Link 
                    ref={el => (line2 = el)} 
                    to="/dashboard/trainings"
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                  >
                    TRAININGS
                  </Link>
                </li>
                <li>
                  <Link 
                    ref={el => (line3 = el)} 
                    to="/about"
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                  >
                    ABOUT US
                  </Link>
                </li>
                <li>
                  <Link 
                    ref={el => (line4 = el)} 
                    to="/"
                    onMouseEnter={e => handleHover(e)}
                    onMouseOut={e => handleHoverExit(e)}
                    onClick={handleLogOut}
                  >
                    LOG OUT
                  </Link>
                </li>
              </ul>
            </nav>
            <div ref={el => (info = el)} className="info">
              <h3>Contact</h3>
              <p>
                Feel free to send me any bug or problem you encounter at the following address or from the form in the about us section.
                <br/>Follow my projects on Github or add me on Linkedin 
              </p>
              <ul>
                <li><a target="blank" href="https://www.linkedin.com/in/paul-lequeux-251a41203/"><img src={linkedin} alt=""/></a></li>
                <li><a target="blank" href="https://github.com/PaulLeqx"><img src={github} className="github" alt=""/></a></li>
              </ul>
              <div>
                <button onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Hamburger;