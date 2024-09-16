import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';
import slide1 from '../../../../images/cases_slide_1.png';
import slide2 from '../../../../images/cases_slide_2.png';
import slide3 from '../../../../images/cases_slide_3.png';
import slide4 from '../../../../images/cases_slide_4.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const Cases = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const container = useRef();
  const images = useRef([]);

  useGSAP(() => {
    if (!swiper) return;

    const sectionMergeSelector = '.section-merge';
    const sectionDescSelector = '.section-desc';
    const headingSelector = `${sectionDescSelector} h3`;
    const frameSelector = '.section-desc-frame';
    const sliderSelector = '.section-cases';
    // const sliderIMGSelector = '.swiper-slide-image img';
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
      .to(sectionMergeSelector, {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionMergeSelector,
          start: 'center center',
          end: '+=400%',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const slideIndex = Math.floor(progress * totalSlides);

            setActiveIndex(slideIndex);
            swiper.slideTo(slideIndex);
          },
        },
        stagger: {
          each: 0.1,
          from: 'random',
        },
      })
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
            trigger: sectionDescSelector,
            start: 'center center',
            end: '+=100%',
            scrub: true,
          },
          stagger: {
            each: 0.006,
            from: 'random',
          },
        }
      )
      .to(frameSelector, {
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: 'center center',
          scrub: true,
        },
        stagger: {
          each: 0.1,
          from: 'random',
        },
      })
      .to(sectionDescSelector, {
        scale: 0,
        opacity: 0,
        xPercent: '20',
        yPercent: '10',
        duration: 3,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: '100% 40%',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      })
      .to(sliderSelector, {
        opacity: 1,
        duration: 3,
        scrollTrigger: {
          trigger: sectionDescSelector,
          start: '100% 40%',
          end: 'bottom top',
          scrub: true,
          markers: true,
        },
      });
  }, [swiper, container]);

  // Animate the corresponding image based on the active slide index
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

            <Swiper
              speed={1000}
              parallax={true}
              onSwiper={(swiper) => setSwiper(swiper)}
              slidesPerView={1}
              spaceBetween={200}
              modules={[Parallax]}
            >
              <SwiperSlide>
                <h2 data-swiper-parallax='-26%'>Pesabase</h2>

                <span className='swiper-slide-text' data-swiper-parallax='-22%'>
                  Pesabase is a groundbreaking blockchain-based remittance platform with a low cost
                  of rate charges and fast operational speed that aims to transform how money is
                  transferred in Africa.
                </span>

                <table data-swiper-parallax='-18%'>
                  <tbody>
                    <tr>
                      <th scope='row'>Role:</th>
                      <td>Front-end developer</td>
                    </tr>

                    <tr>
                      <th scope='row'>Tech Stack:</th>
                      <td>React, Node.js, AWS</td>
                    </tr>
                  </tbody>
                </table>

                <div className='swiper-slide-links'>
                  <button className='button links-el'>case study</button>
                  <button className='button links-el'>Website</button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <h2 data-swiper-parallax='-26%'>Remedy Well</h2>

                <span className='swiper-slide-text' data-swiper-parallax='-22%'>
                  Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum
                  mauris id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
                </span>

                <table data-swiper-parallax='-18%'>
                  <tbody>
                    <tr>
                      <th scope='row'>Role:</th>
                      <td>Front-end developer</td>
                    </tr>

                    <tr>
                      <th scope='row'>Tech Stack:</th>
                      <td>React, Node.js, AWS</td>
                    </tr>
                  </tbody>
                </table>

                <div className='swiper-slide-links'>
                  <button className='button links-el'>case study</button>
                  <button className='button links-el'>Website</button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <h2 data-swiper-parallax='-26%'>Nile Capital</h2>

                <span className='swiper-slide-text' data-swiper-parallax='-22%'>
                  Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum
                  mauris id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
                </span>

                <table data-swiper-parallax='-18%'>
                  <tbody>
                    <tr>
                      <th scope='row'>Role:</th>
                      <td>Front-end developer</td>
                    </tr>

                    <tr>
                      <th scope='row'>Tech Stack:</th>
                      <td>React, Node.js, AWS</td>
                    </tr>
                  </tbody>
                </table>

                <div className='swiper-slide-links'>
                  <button className='button links-el'>case study</button>
                  <button className='button links-el'>Website</button>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <h2 data-swiper-parallax='-26%'>Viice Versa</h2>

                <span className='swiper-slide-text' data-swiper-parallax='-22%'>
                  Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum
                  mauris id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
                </span>

                <table data-swiper-parallax='-18%'>
                  <tbody>
                    <tr>
                      <th scope='row'>Role:</th>
                      <td>Front-end developer</td>
                    </tr>

                    <tr>
                      <th scope='row'>Tech Stack:</th>
                      <td>React, Node.js, AWS</td>
                    </tr>
                  </tbody>
                </table>

                <div className='swiper-slide-links'>
                  <button className='button links-el'>case study</button>
                  <button className='button links-el'>Website</button>
                </div>
              </SwiperSlide>
            </Swiper>

            <span className='swiper-slide-image'>
              <Image ref={(el) => (images.current[0] = el)} src={slide1} alt='Slide 1' />
              <Image ref={(el) => (images.current[1] = el)} src={slide2} alt='Slide 2' />
              <Image ref={(el) => (images.current[2] = el)} src={slide3} alt='Slide 3' />
              <Image ref={(el) => (images.current[3] = el)} src={slide4} alt='Slide 4' />
            </span>
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
