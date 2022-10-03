import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}
Error.getInitialProps = ({ req, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  // Only require Rollbar and report error if we're on the server
  if (!process.browser) {
    const Rollbar = require('rollbar');
    const rollbar = new Rollbar(serverRuntimeConfig.rollbarServerToken);
    rollbar.error(err, req, (rollbarError) => {
      if (rollbarError) {
        return;
      }
    });
  }
  return { statusCode };
};
export default Error;
