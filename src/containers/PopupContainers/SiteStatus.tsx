import React, { useState, useEffect } from 'react';

export const SiteStatus = () => {
  // Set the url of the current page
  const [currentUrl, setCurrentUrl] = useState('');
  const [scamCount, setScamCount] = useState(0);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });
  }, []);

  return (
    <div>
      <h3>
        Current URL: <p>{currentUrl}</p>
        Scam Reports: <b>{scamCount}</b>
      </h3>
    </div>
  );
};

export default SiteStatus;
