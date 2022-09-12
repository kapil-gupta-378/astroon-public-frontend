import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line unused-imports/no-unused-vars
const Button = ({ children, kind, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

Button.propTypes = {
  kind: PropTypes.oneOf(['text', 'link']),
};

Button.defaultProps = {
  kind: 'text',
};
export default Button;
