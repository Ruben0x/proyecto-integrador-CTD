import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import instagram from '../assets/iconos/instagram-icon.png';
import facebook from '../assets/iconos/facebook-icon.png';
import tiktok from '../assets/iconos/tiktok-icon.png';
import whatsapp from '../assets/iconos/whatsapp-icon.png';
import youtube from '../assets/iconos/ico-youtube.png.png';
import LOGO from '../assets/img/LogoWhite.png';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='main-footer'>
        <div className='footer-logo'>
          {/* columna 1 - logo */}
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <img src={LOGO} alt='portal sonoro logo' />
          </Link>
        </div>

        <div className='footer-copyright'>
          <p>
            {' '}
            {/* columna 2 - titulo */}
            &copy;{new Date().getFullYear()}&nbsp;-&nbsp;PORTAL&nbsp;SONORO
          </p>
        </div>

        <div className='footer-social-media'>
          {/* columna 3 - iconos */}
          <ul className='Lista-sin-estilo'>
            <li>
              <img src={facebook} alt='facebook logo' />
            </li>
            <li>
              <img src={instagram} alt='instagram logo' />
            </li>
            <li>
              <img src={tiktok} alt='tiktok logo' />
            </li>
            <li>
              <img src={youtube} alt='youtube logo' />
            </li>
            <li>
              <img src={whatsapp} alt='whatsapp logo' />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
