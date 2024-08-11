import React, { useState } from 'react';

export const SiteStatus = () => {
  // Set the url of the current page
  const [url, setUrl] = useState(null);
  const [scamCount, setScamCount] = useState(0);

  return (
    <div>
      <h3>
        Scam Reports: <b>{scamCount}</b>
      </h3>
      <button>Report Scam</button>
    </div>
  );
};

export default SiteStatus;
