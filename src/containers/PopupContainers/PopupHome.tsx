import React, { useState, useEffect } from 'react';
import SiteStatus from './SiteStatus';
import SubmitReport from './SubmitReport';

const PopupHome = () => {
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    console.log('Page rendered again');
  }, [showStatus]);

  const toggleDisplay = () => {
    setShowStatus((prevShowStatus) => !prevShowStatus);
  };

  return (
    <div>
      {showStatus ? <SiteStatus /> : <SubmitReport />}
      <button onClick={toggleDisplay}>
        {showStatus ? 'Submit Report' : 'Back to Status'}
      </button>
    </div>
  );
};

export default PopupHome;
