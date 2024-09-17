import PropTypes from 'prop-types';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const SlideImage = ({ activeIndex }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [slide, setSlide] = useState(0);
  const frameRef = useRef();
  const canvasRef = useRef();

  // Mouse move event to update mouse position
  const handleMouseMove = (event) => {
    setMousePos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const Frame = () => {
    const canvasScaleAnim = ScrollTrigger.getById('canvas_scale');
    const texture = useLoader(TextureLoader, [
      '/assets/images/cases_slide_1.png',
      '/assets/images/cases_slide_2.png',
      '/assets/images/cases_slide_3.png',
      '/assets/images/cases_slide_4.png',
    ]);

    useFrame(() => {
      if (frameRef.current && canvasScaleAnim.progress >= 1) {
        const x = (mousePos.x / window.innerWidth) * 2 - 1;
        const y = -(mousePos.y / window.innerHeight) * 2 + 1;
        frameRef.current.rotation.y = (x / 5) * Math.PI;
        frameRef.current.rotation.x = -((y / 2) * Math.PI) / 5;
      }
    });

    return (
      <mesh ref={frameRef} position={[1.4, -1, 0]}>
        <planeGeometry args={[4.6, 3.3]} />
        <meshBasicMaterial attach='material' map={texture[slide]} transparent={true} />
      </mesh>
    );
  };

  useEffect(() => {
    setSlide(activeIndex);
  }, [activeIndex]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    gsap.set(canvasRef.current, { scale: 4, xPercent: -40, yPercent: -30 });

    gsap.timeline().to(canvasRef.current, {
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      duration: 3,
      scrollTrigger: {
        id: 'canvas_scale',
        trigger: '.section-desc',
        start: '150% 60%',
        end: '+=50% top',
        scrub: true,
        // markers: true,
      },
    });
  }, []);

  return (
    <Suspense>
      <Canvas
        ref={canvasRef}
        onPointerMove={handleMouseMove}
        style={{ height: '100vh', width: '100vw' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Frame />
      </Canvas>
    </Suspense>
  );
};

SlideImage.propTypes = {
  activeIndex: PropTypes.number,
};

export default SlideImage;
