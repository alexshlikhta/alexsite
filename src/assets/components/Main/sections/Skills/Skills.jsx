import Image from 'next/image';
import PropTypes from 'prop-types';
import skillsBG from '../../../../images/skills_bg.jpg';
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !engineRef.current) {
      const canvasBox = containerRef.current;
      const canvasBoxWidth = canvasBox.getBoundingClientRect().width;
      const canvasBoxHeight = canvasBox.getBoundingClientRect().height;

      const elements = [...document.querySelectorAll('.block')];

      // Setup the Matter.js engine and renderer
      const engine = Matter.Engine.create();
      engineRef.current = engine;
      const world = engine.world;
      world.gravity.y = 0.8;

      // Renderer using a default HTML Canvas
      const render = Matter.Render.create({
        element: containerRef.current,
        engine: engine,
        options: {
          width: canvasBoxWidth,
          height: canvasBoxHeight,
          wireframes: false,
          background: 'transparent',
        },
      });

      Matter.Render.run(render);

      // Create a runner for the engine
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      // Add static boundaries
      const boundaries = [
        // potolok :)
        Matter.Bodies.rectangle(canvasBoxWidth / 2, -50, canvasBoxWidth, 100, {
          isStatic: true,
        }),
        // floor
        Matter.Bodies.rectangle(canvasBoxWidth / 2, canvasBoxHeight + 50, canvasBoxWidth, 100, {
          isStatic: true,
        }),
        // right wall
        Matter.Bodies.rectangle(-50, canvasBoxHeight / 2, 100, canvasBoxHeight, {
          isStatic: true,
        }),
        // left wall
        Matter.Bodies.rectangle(canvasBoxWidth + 50, canvasBoxHeight / 2, 100, canvasBoxHeight, {
          isStatic: true,
        }),
      ];

      Matter.World.add(world, boundaries);

      // create elements for the canvas
      const boxes = elements.map((el) => {
        const elementWidth = el.getBoundingClientRect().width;
        const elementHeight = el.getBoundingClientRect().height;

        return {
          w: elementWidth,
          h: elementHeight,
          body: Matter.Bodies.rectangle(canvasBoxWidth / 2, 0, elementWidth, elementHeight, {
            render: {
              opacity: 0,
            },
          }),
          elem: el,
          render() {
            const { x, y } = this.body.position;
            this.elem.style.left = `${x - this.w / 2}px`;
            this.elem.style.top = `${y - this.h / 2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;
          },
        };
      });

      // add mouse event
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        element: containerRef.current,
      });

      Matter.Composite.add(engine.world, mouseConstraint);

      var explosion = function (delta) {
        var timeScale = 1000 / 60 / delta;
        var bodies = Matter.Composite.allBodies(engine.world);

        for (var i = 0; i < bodies.length; i++) {
          var body = bodies[i];

          if (!body.isStatic && body.position.y >= 500) {
            // scale force for mass and time applied
            var forceMagnitude = 0.1 * body.mass * timeScale;

            // apply the force over a single update
            Matter.Body.applyForce(body, body.position, {
              x:
                (forceMagnitude + Matter.Common.random() * forceMagnitude) *
                Matter.Common.choose([1, -1]),
              y: -forceMagnitude + Matter.Common.random() * -forceMagnitude,
            });
          }
        }
      };

      var timeScaleTarget = 1,
        lastTime = Matter.Common.now();

      const afterUpdate = (event) => {
        var timeScale = (event.delta || 1000 / 60) / 1000;

        // tween the timescale for bullet time slow-mo
        engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 12 * timeScale;

        // every 2 sec (real time)
        if (Matter.Common.now() - lastTime >= 3000) {
          // flip the timescale
          if (timeScaleTarget < 1) {
            timeScaleTarget = 1;
          } else {
            timeScaleTarget = 0;
          }

          // create some random forces
          explosion(event.delta);

          // update last time
          lastTime = Matter.Common.now();
        }
      };

      const rerender = () => {
        boxes.forEach((box) => box.render());
        requestAnimationFrame(rerender);
      };

      // Handle window resize
      const handleResize = () => {
        Matter.Render.lookAt(render, {
          min: { x: 0, y: 0 },
          max: { x: canvasBoxWidth, y: canvasBoxHeight },
        });
      };
      window.addEventListener('resize', handleResize);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        scrub: true,
        once: true,
        // markers: true,
        onEnter: () => {
          // add elements for the canvas
          boxes.forEach((box) => {
            Matter.Composite.add(engine.world, box.body);
          });
          rerender();

          setTimeout(() => {
            Matter.Events.on(engine, 'afterUpdate', function (event) {
              afterUpdate(event);
            });
          }, 2000);
        },
      });
    }
  }, [containerRef]);
  return (
    <section className='section-skills'>
      <div className='container'>
        <div className='section-skills-box' ref={containerRef}>
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
          <span className='block'>Telemedicine</span>
          <span className='block'>e-commerce</span>
          <span className='block'>Blockchain</span>
          <span className='block'>Physics</span>
          <span className='block'>SAAS</span>
          <span className='block'>Architecture</span>
        </div>
      </div>
    </section>
  );
};

Skills.propTypes = {
  isMobile: PropTypes.bool,
};

export default Skills;
