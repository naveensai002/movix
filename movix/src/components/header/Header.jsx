import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ContentWrapper from '../contentWrapper/contentWrapper';
import logo from '../../assets/movix-logo.svg';
import { HiOutlineSearch } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { SlMenu } from 'react-icons/sl';
import './styles.scss';

const Header = () => {
  const [show, setShow] = useState('top');
  const [query, setQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ''}`}>
      <ContentWrapper>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>
        <ul className='menuItems'>
          <li className='menuItem'>Movies</li>
          <li className='menuItem'>Tv shows</li>
          <li className='menuItem'>
            <HiOutlineSearch />
          </li>
        </ul>
        <div className='mobileMenuItems'>
          <HiOutlineSearch />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
    </header>
  );
};

export default Header;
