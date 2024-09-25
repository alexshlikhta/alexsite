/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TabletFrame from '../TabletFrame';

gsap.registerPlugin(ScrollTrigger);

const SlideImage = ({ activeIndex }) => {
  return (
    <Suspense>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <TabletFrame activeIndex={activeIndex} />
      </Canvas>
    </Suspense>
  );
};

SlideImage.propTypes = {
  activeIndex: PropTypes.number,
};

export default SlideImage;
