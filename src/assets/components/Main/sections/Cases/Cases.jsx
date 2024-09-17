import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SlideImage from '../../../SlideImage';
import Slider from '../../../Slider';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const Cases = () => {
  const container = useRef();
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = useRef([]);

  const setSlider = (slider) => setSwiper(slider);

  useGSAP(() => {
    if (!swiper) return;

    const sectionMergeSelector = '.section-merge';
    const sectionDescSelector = '.section-desc';
    const headingSelector = `${sectionDescSelector} h3`;
    const frameSelector = '.section-desc-frame';
    const sliderSelector = '.section-cases';
    // const sliderIMGSelector = '.swiper-slide-image';
    const totalSlides = swiper.slides.length;

    const splitTitle = new SplitText(headingSelector, {
      type: 'words',
      wordsClass: 'word',
    });

    gsap.set(headingSelector, { perspective: 1000 });
    gsap.set(frameSelector, { scale: 0 });

    const randomValue = (min, max) => gsap.utils.random(min, max);

    const timeline = gsap.timeline();

    timeline
      // pinning section with slider and text-anim
      .to(sectionMergeSelector, {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionMergeSelector,
          start: 'center center',
          end: '+=700%',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.floor(progress * totalSlides);

            if (slideIndex <= totalSlides - 1) {
              setActiveIndex(slideIndex);
              swiper.slideTo(slideIndex);
            }
          },
        },
        stagger: {
          each: 0.1,
          from: 'random',
        },
      })
      // text description (1st section)
      .fromTo(
        splitTitle.words,
        {
          'will-change': 'opacity, transform',
          z: () => randomValue(200, 1000),
          opacity: 0,
          xPercent: () => randomValue(-100, 100),
          yPercent: () => randomValue(-10, 10),
          rotationX: () => randomValue(-90, 90),
        },
        {
          ease: 'expo',
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          xPercent: 0,
          yPercent: 0,
          z: 0,
          scrollTrigger: {
            id: 'text together',
            trigger: sectionDescSelector,
            start: 'center center',
            end: '+=70%',
            scrub: true,
          },
          stagger: {
            each: 0.006,
            from: 'random',
          },
        }
      )
      // scale little frames from 0 to 1 in the text description (1st section)
      .to(frameSelector, {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: 'center center',
          scrub: true,
          end: '+=70%',
        },
        stagger: {
          each: 0.1,
          from: 'random',
        },
      })
      // scale 1 section frames from 1 to 0 with opacity to 0
      .to(sectionDescSelector, {
        // id:'scale to 0 text',
        scale: 0,
        opacity: 0,
        xPercent: '20',
        yPercent: '10',
        duration: 3,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: '150% 60%',
          end: '+=25% top',
          scrub: true,
          // markers: true,
        },
      })
      // opacity of second section from 0 to 1
      .to(sliderSelector, {
        // id:'opacity to 1 image',
        opacity: 1,
        duration: 3,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: '150% 60%',
          end: '+=50% top',
          scrub: true,
          // markers: true,
        },
      });
  }, [swiper, container]);

  useEffect(() => {
    if (images.current.length > 0) {
      gsap.to(images.current, { opacity: 0, duration: 1 });

      gsap.to(images.current[activeIndex], {
        opacity: 1,
        duration: 1,
        ease: 'expo.out',
      });
    }
  }, [activeIndex]);

  return (
    <section className='section-merge' ref={container}>
      <div className='section-desc'>
        <h3>
          Hi, I&apos;m Alex, a passionate
          <span className='section-desc-frame'></span>
          front-end developer dedicated to creating
          <span className='section-desc-frame'></span>
          engaging and
          <span className='section-desc-frame'></span>
          intuitive web experiences ✌️
        </h3>
      </div>

      <div className='section-cases'>
        <div className='container'>
          <div className='section-cases-box'>
            <h5>Selected Cases</h5>

            <Slider setSlider={setSlider} />

            <div className='swiper-slide-canvas'>
              <SlideImage activeIndex={activeIndex} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Cases.propTypes = {
  isMobile: PropTypes.bool,
};

export default Cases;
