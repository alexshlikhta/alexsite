import PropTypes from 'prop-types';
import data from '../../../../data/expirience.json';
import Image from 'next/image';
import expPhoto from '../../../../images/exp_photo.png';
import gsap from 'gsap';

const Exp = () => {
  const hoverElAnim = (e) => {
    const el = e.currentTarget;
    const elBorder = e.currentTarget.querySelector('.steps-el-border');
    const elPos = el.getBoundingClientRect();

    if (el) {
      const centerX = elPos.left + el.offsetWidth / 2;
      const centerY = elPos.top + el.offsetHeight / 2;
      const dy = e.clientX - centerX;
      const dx = e.clientY - centerY;

      var radians = Math.atan2(e.clientX - centerX, e.clientY - centerY);
      var degree = radians * (180 / Math.PI) * -1;

      gsap.to(el, {
        duration: 1,
        rotateY: -dy / 20,
        rotateX: dx / 20,
        perspective: 800,
        transformStyle: 'preserve-3d',
        ease: 'power3.out',
      });

      gsap.set(elBorder, {
        '--rotate': degree + 'deg',
        ease: 'power3.out',
      });
    }
  };

  return (
    <section className='section-exp'>
      <div className='container'>
        <div className='section-exp-box'>
          <h3>
            With 5 years of experience at a creative studio, I&apos;ve had the pleasure of working
            on a variety of projects spanning{' '}
            <b>
              real estate, healthcare, e-commerce, entertainment, crypto, and financial industries.
            </b>
          </h3>

          <ul className='steps'>
            {data.map(({ title, description }, index) => {
              const lastEl = index + 1 === data.length;
              return (
                <li
                  className={`steps-el ${lastEl ? 'custom' : ''}`}
                  key={index}
                  onMouseMove={(e) => hoverElAnim(e)}
                >
                  <span className='steps-el-border'></span>

                  <div className='steps-el-box'>
                    {!lastEl ? (
                      <h4>{title}</h4>
                    ) : (
                      <div className='img'>
                        <Image src={expPhoto} />
                      </div>
                    )}

                    <div className='desc'>{description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

Exp.propTypes = {
  isMobile: PropTypes.bool,
};

export default Exp;
