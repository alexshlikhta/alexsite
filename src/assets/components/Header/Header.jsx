import iconMoon from '../../icons/icon_moon.svg';
import iconSun from '../../icons/icon_sun.svg';
import iconCorner from '../../icons/icon_corner.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <>
      <header className='c-header'>
        <div className='container'>
          <div className='c-header-left'>
            <a className='logo' href='/'>
              Alex Shlikhta
            </a>

            <div className='switcher'>
              <Image src={iconMoon} alt='hero bg image' />
              <Image src={iconSun} alt='hero bg image' />
            </div>

            <span className='corner corner--one'>
              <Image src={iconCorner} alt='hero bg image' />
            </span>

            <span className='corner corner--two'>
              <Image src={iconCorner} alt='hero bg image' />
            </span>
          </div>

          <div className='c-header-right'>
            <span className='corner corner--one'>
              <Image src={iconCorner} alt='hero bg image' />
            </span>

            <span className='corner corner--two'>
              <Image src={iconCorner} alt='hero bg image' />
            </span>
            <ul className='links'>
              <li className='links-el'>
                <a className='active' href='http:/'>
                  about
                </a>
              </li>

              <li className='links-el'>
                <a href='http:/'>projects</a>
              </li>

              <li className='links-el'>
                <a href='http:/'>skills</a>
              </li>
            </ul>

            <div className='contact'>
              <button className='button button--custom'>contact</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
