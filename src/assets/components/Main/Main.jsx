import { Hero, Cases, Works, Exp, Skills } from './sections';
import PropTypes from 'prop-types';

const Main = ({ isMobile }) => {
  return (
    <>
      <main className='c-main'>
        <Hero isMobile={isMobile} />
        <Cases isMobile={isMobile} />
        <Works isMobile={isMobile} />
        <Exp isMobile={isMobile} />
        <Skills isMobile={isMobile} />
      </main>
    </>
  );
};

Main.propTypes = {
  isMobile: PropTypes.bool,
};

export default Main;
