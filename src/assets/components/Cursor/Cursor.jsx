import gsap from 'gsap';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '../../helpers/isomorphicEffect';

const Cursor = () => {
  const cursor = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const link = document.querySelectorAll('a');
    const moveX = gsap.quickTo(cursor.current, 'x', { duration: 0.2, ease: 'power3' });
    const moveY = gsap.quickTo(cursor.current, 'y', { duration: 0.2, ease: 'power3' });

    const handleMouseMove = (e) => {
      moveX(e.clientX);
      moveY(e.clientY);
    };

    const addClass = () => {
      cursor.current.classList.add('hovered');
    };

    const removeClass = () => {
      cursor.current.classList.remove('hovered');
    };

    document.addEventListener('mousemove', handleMouseMove);

    link.forEach((el) => {
      el.addEventListener('mouseover', addClass);
      el.addEventListener('mouseout', removeClass);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='c-cursor' ref={cursor}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 61 72'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g filter='url(#filter0_b_499_140)'>
          <path
            d='M0.638058 65.9027L3.21044 5.03648C3.38477 0.911592 8.2004 -1.2366 11.3862 1.38936L58.4572 40.1883C62.1618 43.2418 59.8523 49.2537 55.0561 49.0416L29.4405 47.9088C27.8571 47.8388 26.3342 48.5237 25.336 49.7548L9.51726 69.263C6.48385 73.0039 0.434692 70.7146 0.638058 65.9027Z'
            fill='white'
            fillOpacity='0.3'
          />
          <path
            d='M0.638058 65.9027L3.21044 5.03648C3.38477 0.911592 8.2004 -1.2366 11.3862 1.38936L58.4572 40.1883C62.1618 43.2418 59.8523 49.2537 55.0561 49.0416L29.4405 47.9088C27.8571 47.8388 26.3342 48.5237 25.336 49.7548L9.51726 69.263C6.48385 73.0039 0.434692 70.7146 0.638058 65.9027Z'
            fill='url(#paint0_linear_499_140)'
            fillOpacity='0.2'
          />
          <path
            className='c-cursor-line'
            d='M3.13583 66.0082L5.70821 5.14205C5.79538 3.07962 8.20318 2.0055 9.79611 3.31849L56.8671 42.1174C58.7194 43.6442 57.5646 46.6501 55.1666 46.5441L29.551 45.4112C27.1758 45.3062 24.8915 46.3335 23.3941 48.1802L7.57543 67.6884C6.05874 69.5588 3.03414 68.4142 3.13583 66.0082Z'
            stroke='white'
            strokeOpacity='0.15'
            strokeWidth='5'
          />
        </g>
        <defs>
          <filter
            id='filter0_b_499_140'
            x='-39.3672'
            y='-39.7607'
            width='139.656'
            height='150.886'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feGaussianBlur in='BackgroundImageFix' stdDeviation='20' />
            <feComposite in2='SourceAlpha' operator='in' result='effect1_backgroundBlur_499_140' />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_backgroundBlur_499_140'
              result='shape'
            />
          </filter>
          <linearGradient
            id='paint0_linear_499_140'
            x1='0'
            y1='38'
            x2='70'
            y2='38'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1388D1' />
            <stop offset='1' stopColor='#6D4CB4' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Cursor;
