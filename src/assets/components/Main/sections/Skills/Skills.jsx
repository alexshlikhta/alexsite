import Image from 'next/image';
import PropTypes from 'prop-types';
import skillsBG from '../../../../images/skills_bg.jpg';
import { useRef } from 'react';

const Skills = () => {
  const container = useRef(null);

  return (
    <section className='section-skills' ref={container}>
      <div className='container'>
        <div className='section-skills-box'>
          <span className='section-skills-bg'>
            <Image src={skillsBG} />
          </span>

          <h2>
            Skills
            <br />& tools
          </h2>

          <div className='desc'>
            <div className='desc-text'>
              I&apos;m all about growth and innovation. I continuously hone my skills, always on the
              lookout for the latest tools and approaches to bring the best solutions to every
              project. These are technologies I have already dealt with, and how many more await me
              ahead!
            </div>

            <table>
              <tbody>
                <tr>
                  <th scope='row'>Languages:</th>
                  <td>HTML, CSS, JavaScript, TypeScript</td>
                </tr>

                <tr>
                  <th scope='row'>Frameworks & Libraries:</th>
                  <td>React, Angular, Vue.js</td>
                </tr>

                <tr>
                  <th scope='row'>Tools & Platforms:</th>
                  <td>Node.js, Firebase, AWS, Git</td>
                </tr>

                <tr>
                  <th scope='row'>Other:</th>
                  <td>Agile Methodologies, Responsive Design, Cross-Browser Compatibility</td>
                </tr>
              </tbody>
            </table>
          </div>

          <span className='block'>3D</span>
        </div>
      </div>
    </section>
  );
};

Skills.propTypes = {
  isMobile: PropTypes.bool,
};

export default Skills;
