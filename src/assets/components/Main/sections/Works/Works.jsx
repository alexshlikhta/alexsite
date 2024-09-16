import PropTypes from 'prop-types';
import data from '../../../../data/works.json';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const Works = () => {
  const { header, projects } = data;

  const container = useRef();
  // const lettersAndSymbols = [
  //   'a',
  //   'b',
  //   'c',
  //   'd',
  //   'e',
  //   'f',
  //   'g',
  //   'h',
  //   'i',
  //   'j',
  //   'k',
  //   'l',
  //   'm',
  //   'n',
  //   'o',
  //   'p',
  //   'q',
  //   'r',
  //   's',
  //   't',
  //   'u',
  //   'v',
  //   'w',
  //   'x',
  //   'y',
  //   'z',
  //   '!',
  //   '@',
  //   '#',
  //   '$',
  //   '%',
  //   '^',
  //   '&',
  //   '*',
  //   '-',
  //   '_',
  //   '+',
  //   '=',
  //   ';',
  //   ':',
  //   '<',
  //   '>',
  //   ',',
  // ];
  useGSAP(
    () => {
      const section = '.section-works';
      const words = '.section-works td';

      console.log(words);

      // const splitTitle = new SplitText(words, {
      //   type: 'chars',
      // });

      // const animateText = () => {
      //   gsap.to(words, {
      //     duration: 10,
      //     scrambleText: {
      //       text: '{original}',
      //       chars: lettersAndSymbols,
      //     },
      //     stagger: {
      //       each: 0.1,
      //     },
      //   });
      // };

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // onEnter: animateText,
      });
    },
    { scope: container }
  );

  return (
    <section className='section-works' ref={container}>
      <div className='container'>
        <div className='section-works-title'>Latest projects</div>

        <table>
          <thead>
            <tr>
              {header.map((field, index) => {
                return <th key={index}>{field}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {projects.map(({ year, project_name, description, role, tech_stack, link }) => {
              return (
                <tr key={link}>
                  <td>{year}</td>
                  <th scope='row'>{project_name}</th>
                  <td>{description}</td>
                  <td>{role}</td>
                  <td>{tech_stack}</td>
                  <td>{link}</td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <td>2024</td>
              <th scope='row' colSpan='4'>
                Want your project to be the next?
              </th>
              <td>
                <button className='button'>Get in touch</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

Works.propTypes = {
  isMobile: PropTypes.bool,
};

export default Works;
