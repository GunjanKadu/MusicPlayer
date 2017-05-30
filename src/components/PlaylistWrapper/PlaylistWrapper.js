import React from 'react';
import PropTypes from 'prop-types';

import './main.css';

const PlaylistWrapper = ({children}) => (
  <div className="playlist-wrapper">
    {children}
  </div>
);

PlaylistWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default PlaylistWrapper;
