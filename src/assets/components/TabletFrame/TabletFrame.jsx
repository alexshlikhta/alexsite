import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { RoundedBox } from '@react-three/drei';
import { Edges } from '@react-three/drei';
import ImageFrame from '../ImageFrame';
import { useThree } from '@react-three/fiber'; // Import useThree

gsap.registerPlugin(ScrollTrigger);

const TabletFrame = ({ activeIndex }) => {
  const figure = useRef();
  const [anim, setAnim] = useState(null);

  let lastDirection = { x: 1, y: 1, z: 1 }; // Track last direction for each axis

  const randomValueWithGapAndFlip = (min, max, previousValue, gap, direction) => {
    let newValue;
    do {
      newValue = gsap.utils.random(min, max) * direction; // Ensure alternating direction
    } while (Math.abs(newValue - previousValue) < gap);

    // Flip the direction for the next step
    return newValue;
  };

  const figureAnim = () => {
    if (anim) return;

    const currentRotation = figure.current.rotation;

    const currentAnim = gsap.timeline().to(figure.current.rotation, {
      x: () => {
        const newX =
          ((randomValueWithGapAndFlip(-1, 1, currentRotation.x, 0.5, lastDirection.x) / 2) *
            Math.PI) /
          2;
        lastDirection.x *= -1; // Flip direction for x after each cycle
        return newX;
      },
      y: () => {
        const newY =
          ((randomValueWithGapAndFlip(-1, 1, currentRotation.y, 0.3, lastDirection.y) / 4) *
            Math.PI) /
          4;
        lastDirection.y *= -1; // Flip direction for y after each cycle
        return newY;
      },
      z: () => {
        const newZ =
          ((randomValueWithGapAndFlip(-1, 1, currentRotation.z, 0.2, lastDirection.z) / 6) *
            Math.PI) /
          6;
        lastDirection.z *= -1; // Flip direction for z after each cycle
        return newZ;
      },
      ease: 'none',
      duration: 2 + Math.random() * 1.5,
      onComplete: figureAnim,
    });

    setAnim(currentAnim);
  };

  const stopAnimRule = () => {
    return (
      (anim && activeIndex.direction < 0 && activeIndex.progress < 0.3) ||
      (anim && activeIndex.direction > 0 && activeIndex.progress > 0.99)
    );
  };

  useEffect(() => {
    if (!figure.current) return;
    console.log(figure.current.material.color);
    figure.current.material.color.set('#545454'); // Change to any color like red

    gsap.set(figure.current.scale, { x: 1.2, y: 1.2, z: 1.2 });
    gsap.set('.text-move', { xPercent: 150 });

    gsap
      .timeline()
      .to(figure.current.scale, {
        x: 0.24,
        y: 0.24,
        z: 0.24,
        duration: 3,
        scrollTrigger: {
          id: 'canvas_scale',
          trigger: '.section-desc',
          start: '150% 60%',
          end: '+=50% top',
          scrub: true,
          // markers: true,
        },
      })
      .to(figure.current.position, {
        x: 1.4,
        y: -0.6,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-desc',
          start: '200% 30%',
          end: '+=50% top',
          scrub: true,
          // markers: true,
        },
      })
      .to('.section-desc', {
        opacity: 0,
        xPercent: 20,
        yPercent: 20,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-desc',
          start: '200% 30%',
          end: '+=50% top',
          scrub: true,
          // markers: true,
        },
      })
      .to('.text-move', {
        xPercent: 0,
        duration: 4,
        // ease: 'power1.inOut',
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: '.section-desc',
          start: '200% 30%',
          end: '+=100% top',
          scrub: true,
          // markers: true,
        },
        stagger: 0.4,
      });
  }, []);

  useEffect(() => {
    if (activeIndex.progress > 0.3 && !anim) figureAnim();

    if (stopAnimRule()) {
      anim.kill();
      setAnim(null);
      gsap.to(figure.current.rotation, 1, { x: 0, y: 0, z: 0 });
    }
  }, [activeIndex]);

  return (
    <group>
      <RoundedBox
        ref={figure}
        scale={[0.3, 0.3, 0.3]}
        args={[14, 10, 1]}
        radius={1}
        smoothness={10}
      >
        <meshStandardMaterial color={'#0c0c0c'} />
        <Edges position={[-6, -4, 0.5]} linewidth={1} scale={1} color='#6C6C6C' />
        <ImageFrame activeIndex={activeIndex} />
      </RoundedBox>
    </group>
  );
};

TabletFrame.propTypes = {
  activeIndex: PropTypes.object,
  figure: PropTypes.object,
  slides: PropTypes.array,
};

export default TabletFrame;
