import './index.scss';
import logo from '../../assets/images/logo_small_icon_only.png';

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer-content">
        <img src={logo} alt="logo-strenght-keeper"/>
        &copy; - Paul Lequeux
      </p>
    </div>
  );
};


export default Footer;