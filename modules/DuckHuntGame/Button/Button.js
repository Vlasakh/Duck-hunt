import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';

import './Button.css';

const Button = ({
  children,
  type,
  className,
  onClick,
  disabled,
  active,
  ...attr
}) => {
  const classes = classNames('btn', className, { active });

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...attr}>
      {children}
    </button>
  );
};

// Button.propTypes = {
//   children: PropTypes.node,
//   type: PropTypes.string,
//   classNames: PropTypes.string,
//   onClick: PropTypes.func,
//   disabled: PropTypes.bool,
//   active: PropTypes.bool,
// };

// Button.defaultProps = {
//   children: 'default button',
//   type: 'button',
//   className: '',
//   onClick: () => {},
//   disabled: false,
//   ative: false,
// };

export default Button;