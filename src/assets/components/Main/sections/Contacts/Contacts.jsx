import PropTypes from 'prop-types';

const Contacts = () => {
  return (
    <section className='section-contacts'>
      <div className='container'>
        <div className='section-contacts-box'>
          <div className='collab'>
            <span className='collab-text'>
              Ready to work with progressive studios, brands, and creatives.
            </span>

            <h3>Have a project idea or looking for collaboration?</h3>
            <a href='mailto:alexshlikhta@gmail.com'>Let&apos;s connect</a>
          </div>

          <ul className='socials'>
            <li>
              <a href='mailto:alexshlikhta@gmail.com'>e. alexshlikhta@gmail.com</a>
            </li>

            <li>
              <a href='tel:+38093270902'>p. +38 093 270 90 20</a>
            </li>

            <li>
              <a>t. @alex-shlikhta</a>
            </li>

            <li>
              <a target='_blank' href='/'>
                l. in/alex-shlikhta
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

Contacts.propTypes = {
  isMobile: PropTypes.bool,
};

export default Contacts;
