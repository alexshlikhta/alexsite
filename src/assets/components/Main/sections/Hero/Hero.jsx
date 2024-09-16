import PropTypes from 'prop-types';
import heroBG from '../../../../images/hero_bg.png';
import iconStatus from '../../../../icons/icon_status.png';
import iconArrow from '../../../../icons/icon_arrow_circle.svg';
import iconCorner from '../../../../icons/icon_corner.svg';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className='section-hero'>
      <div className='container'>
        <div className='section-hero-box'>
          <span className='section-hero--bg'>
            <Image src={heroBG} alt='hero bg image' />
          </span>

          <div className='info'>
            <div className='info-status'>
              <div className='info-status-image'>
                <Image src={iconStatus} alt='hero bg image' />
              </div>

              <div className='info-status-text'>
                Available for freelance projects and joining the team
              </div>
            </div>
          </div>

          <div className='touch'>
            <div className='touch-box'>
              <span className='corner one'>
                <Image src={iconCorner} alt='hero bg image' />
              </span>

              <span className='corner two'>
                <Image src={iconCorner} alt='hero bg image' />
              </span>

              <h1>Creative</h1>
            </div>

            <div className='touch-box'>
              <h1>front-end developer</h1>

              <span className='touch-subtitle'>
                With a keen eye for details and a knack for problem-solving, I transform design
                ideas into visually stunning and functional websites.
              </span>

              <div className='touch-row'>
                <a className='button button--custom' href='http://'>
                  GET IN TOUCH
                </a>

                <span className='touch-row-icon'>
                  <Image src={iconArrow} alt='hero bg image' />
                </span>
              </div>

              <span className='corner three'>
                <Image src={iconCorner} alt='hero bg image' />
              </span>
            </div>
          </div>

          <span className='corner four'>
            <Image src={iconCorner} alt='hero bg image' />
          </span>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  isMobile: PropTypes.bool,
};

export default Hero;
