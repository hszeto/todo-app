import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = () => {
  return(
    <div id="loader">
      <CircularProgress
        size={68} 
        thickness={8}
      />
    </div>
  );
};

export default Loader;
