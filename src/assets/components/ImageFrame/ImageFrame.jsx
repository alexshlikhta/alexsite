/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger);

const ImageFrame = ({ activeIndex }) => {
  const slides = useRef([]);

  const textures = useLoader(TextureLoader, [
    '/assets/images/cases_slide_0.png',
    '/assets/images/cases_slide_1.png',
    '/assets/images/cases_slide_2.png',
    '/assets/images/cases_slide_3.png',
    '/assets/images/cases_slide_4.png',
  ]);

  const getCurrentSlideForTexture = activeIndex.slide + (activeIndex.direction > 0 ? 1 : 2);

  const getXdirection = () => {
    if (activeIndex.progress > 0.3 && activeIndex.direction > 0) return 0;
    if (activeIndex.progress < 0.83 && activeIndex.direction < 0) return 25;
  };

  useEffect(() => {
    if (!slides) return;

    gsap.to(slides.current[getCurrentSlideForTexture]?.position, {
      x: getXdirection(),
      duration: 1,
    });
  }, [activeIndex.slide]);

  useEffect(() => {
    gsap.set(slides.current[0]?.position, { x: 0 });

    gsap.to(slides.current[1]?.position, {
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.section-desc',
        start: '200% 30%',
        end: '+=50% top',
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return textures.map((texture, index) => {
    return (
      <mesh
        key={index}
        ref={(ref) => (slides.current[index] = ref)}
        position={[30, 0, 0.5 + index * 0.01]}
        scale={[0.93, 0.93, 0.93]}
      >
        <planeGeometry args={[14, 10]} />
        <meshBasicMaterial attach='material' map={texture} transparent={true} />
      </mesh>
    );
  });
};

ImageFrame.propTypes = {
  activeIndex: PropTypes.number,
};

export default ImageFrame;
