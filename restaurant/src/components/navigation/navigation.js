import './nav.css'; // Assuming this CSS file is in the right place
import { Link } from 'react-router-dom'; // Import Link component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
const NavigationBar = () => {
  return (
    <nav className="navigation">
    <div className="logo">
    </div>
    <ul className="nav-links">
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/offer">PROMOTIONS</Link></li>
      <li><Link to="/menu">MENU</Link></li>
      <li><Link to="/contact">CONTACT US</Link></li>
      <li><Link to="/login">LOGIN</Link></li>

      <li className="cart-link">
        <Link to="/cart">
        <FontAwesomeIcon icon={faShoppingCart} /> {/* Font Awesome cart icon */}
        </Link>
      </li>
    </ul>
    <div className="sign-in">
      
    </div>
  </nav>
  
  );
};

export default NavigationBar;

