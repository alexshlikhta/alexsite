import './assets/styles/styles.scss';
import Header from './assets/components/Header';
import Main from './assets/components/Main';
import Cursor from './assets/components/Cursor';
import checkIsMobile from './assets/hooks/useIsMobile';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import useIsomorphicLayoutEffect from './assets/helpers/isomorphicEffect';
import { useRef } from 'react';
import gsap from 'gsap';
import Scene from './assets/components/Scene';
import Footer from './assets/components/Footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const isMobile = checkIsMobile();
  const smoother = useRef();
  const ctx = useRef();

  useIsomorphicLayoutEffect(() => {
    if (!isMobile) {
      ctx.current = gsap.context(() => {
        smoother.current = ScrollSmoother.create({
          smooth: 2,
          effects: true,
          normalizeScroll: true,
        });
      });
    }
  }, []);

  return (
    <>
      <SpeedInsights />
      <div className='scene'>
        <Scene />
      </div>
      <Header isMobile={isMobile} smoother={smoother} />
      <div id='smooth-wrapper'>
        <div id='smooth-content'>
          <Main isMobile={isMobile} />
        </div>
      </div>

      <Footer />
      <Cursor />
    </>
  );
};

export default App;
