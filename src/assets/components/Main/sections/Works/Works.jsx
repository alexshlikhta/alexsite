import PropTypes from 'prop-types';
import data from '../../../../data/works.json';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const lettersAndSymbols = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '-',
  '_',
  '+',
  '=',
  ';',
  ':',
  '<',
  '>',
  ',',
];

const Works = () => {
  const { header, projects } = data;
  const container = useRef(null);
  const textRefs = useRef([]);

  const splitText = (column) => {
    if (!column) return;

    const splitter = new SplitText(column, { type: 'chars', charsClass: 'char' });
    const splitChars = splitter.chars;
    return splitChars;
  };

  const animate = (splitChars) => {
    if (!splitChars) return;

    splitChars.forEach((char, position) => {
      let initialHTML = char.innerHTML;
      let repeatCount = 0;

      gsap.fromTo(
        char,
        { opacity: 0 },
        {
          duration: 0.03,
          onStart: () => {
            gsap.set(char, { '--opa': 1 });
          },
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
          },
          repeat: 3,
          onRepeat: () => {
            repeatCount++;
            if (repeatCount === 1) {
              gsap.set(char, { '--opa': 0 });
            }
          },
          repeatRefresh: true,
          repeatDelay: 0.04,
          delay: (position + 1) * 0.07,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          opacity: 1,
        }
      );
    });
  };

  useGSAP(() => {
    if (textRefs.current.length) {
      textRefs.current.map((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top bottom',
          scrub: true,
          onEnter: () => {
            const columns = [...row.querySelectorAll('td')];
            columns.forEach((column) => {
              const splitChars = splitText(column);
              animate(splitChars);
            });
          },
          // markers: true,
        });
      });
    }
  }, [container]);

  return (
    <section className='section-works' ref={container}>
      <div className='container'>
        <div className='section-works-title'>Latest projects</div>
        <table>
          <thead>
            <tr>
              {header.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {projects.map(
              ({ year, project_name, description, role, tech_stack, link }, rowIndex) => (
                <tr key={link} ref={(el) => (textRefs.current[rowIndex] = el)}>
                  <td>{year}</td>
                  <td scope='row'>{project_name}</td>
                  <td>{description}</td>
                  <td>{role}</td>
                  <td>{tech_stack}</td>
                  <td>
                    <a href={link}>Visit</a>
                  </td>
                </tr>
              )
            )}
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
