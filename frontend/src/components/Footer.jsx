import { Link } from 'react-router-dom';
import '../styles/Footer.css';

import React from "react";

import LOGO from "../assets/img/LOGO.svg";
import { Link } from "react-router-dom";
import facebook from "../assets/img/socialMediaIcons/facebook.png";
import tiktok from "../assets/img/socialMediaIcons/tiktok.png";
import whatsapp from "../assets/img/socialMediaIcons/whatsapp.png";
import instagram from "../assets/img/socialMediaIcons/instagram.png";
import youtube from "../assets/img/socialMediaIcons/youtube.png";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className='main-footer'>
      <div className='footer-logo'>
        {/* columna 1 - logo */}
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <img src={LOGO} alt='' />
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
            <img src={facebook} alt='' />
          </li>
          <li>
            <img src={instagram} alt='' />
          </li>
          <li>
            <img src={tiktok} alt='' />
          </li>
          <li>
            <img src={youtube} alt='' />
          </li>
          <li>
            <img src={whatsapp} alt='' />
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <div className="main-footer">
    <div className="footer-logo">
      {/* columna 1 - logo */}
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <img src={LOGO} alt="" />
      </Link>
    </div>

    <div className="footer-copyright">
      <p>
        {" "}
        {/* columna 2 - titulo */}
        &copy;{new Date().getFullYear()}&nbsp;-&nbsp;PORTAL&nbsp;SONORO
      </p>
    </div>

    <div className="footer-social-media">
      {/* columna 3 - iconos */}
      <ul className="Lista-sin-estilo">
        <li>
          <img src={facebook} alt="" />
        </li>
        <li>
          <img src={instagram} alt="" />
        </li>
        <li>
          <img src={tiktok} alt="" />
        </li>
        <li>
          <img src={youtube} alt="" />
        </li>
        <li>
          <img src={whatsapp} alt="" />
        </li>
      </ul>
    </div>
  </div>
  );
};
