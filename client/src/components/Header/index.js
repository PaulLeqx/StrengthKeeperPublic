import {useState, useEffect} from 'react';
import {withRouter, Link} from 'react-router-dom';

import './index.scss';
import logo from "../../assets/images/logo_small.png";
import smallLogo from '../../assets/images/logo_small_icon_only_inverted.png';
import Hamburger from '../../containers/Hamburger';

const Header = ({history}) => {
  const [state, setState] = useState({
    initial: false,
    clicked: null,
    menuName: "Menu"
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    history.listen(() => {
        setState({clicked: false, menuName: 'Menu'})
    });
  });

  const handleMenu = () => {
    disableMenu();
    if(state.initial === false) {
      setState({
        initial: null,
        clicked: true,
        menuName: 'Close'
      });
    } else if (state.clicked === true) {
      setState({
        clicked: !state.clicked,
        menuName: 'Menu'
      });
    } else if (state.clicked === false) {
      setState({
        clicked: !state.clicked,
        menuName: 'Close'
      });
    }
  };

  const disableMenu = () => {
    setDisabled(!disabled);
      setTimeout(() => {
        setDisabled(false)
      }, 1200);
  };

  return (
    <header>
      <div className="inner-header">
        <div className="logo">
          <Link to="/">
            {window.innerWidth > 700 ? <img src={logo} alt="" /> : <img className="smalllogo" src={smallLogo} alt="" />}
          </Link>
          <h2>Train as Hard as you Can</h2>
        </div>
        <div className="menu">
          <button disabled={disabled} onClick={handleMenu}>
            {state.menuName}
          </button>
        </div>
      </div>
      <Hamburger state={state} />
    </header>
  );
};

export default withRouter(Header);