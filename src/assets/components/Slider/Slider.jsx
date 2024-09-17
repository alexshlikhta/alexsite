import { Swiper, SwiperSlide } from 'swiper/react';
import { Parallax } from 'swiper/modules';
import PropTypes from 'prop-types';

const Slider = ({ setSlider }) => {
  return (
    <>
      <Swiper
        speed={1000}
        parallax={true}
        onSwiper={(swiper) => setSlider(swiper)}
        slidesPerView={1}
        spaceBetween={200}
        modules={[Parallax]}
      >
        <SwiperSlide>
          <h2 data-swiper-parallax='-26%'>Pesabase</h2>

          <span className='swiper-slide-text' data-swiper-parallax='-22%'>
            Pesabase is a groundbreaking blockchain-based remittance platform with a low cost of
            rate charges and fast operational speed that aims to transform how money is transferred
            in Africa.
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
            Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum mauris
            id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
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
            Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum mauris
            id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
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
            Lorem ipsum dolor sit amet consectetur. Malesuada gravida aliquam duis fermentum mauris
            id dui euismod sed. Dolor id diam lacinia sagittis tellus consequat.
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
    </>
  );
};

Slider.propTypes = {
  setSlider: PropTypes.func,
};

export default Slider;
