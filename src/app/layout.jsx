import PropTypes from 'prop-types';

export const metadata = {
  title: 'WWW - rhythm of your life',
  description: 'WWW flow is the rhythm of your sales.​',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any,
};
