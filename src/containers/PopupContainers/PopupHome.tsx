import React, { useState, useEffect } from 'react';
import SiteStatus from './SiteStatus';
import SubmitReport from './SubmitReport';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/86131/ivory-shield/version/latest',
  cache: new InMemoryCache(),
});

const PopupHome = () => {
  const [showStatus, setShowStatus] = useState(true);

  useEffect(() => {
    console.log('Page rendered again');
  }, [showStatus]);

  const toggleDisplay = () => {
    setShowStatus((prevShowStatus) => !prevShowStatus);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        {showStatus ? <SiteStatus /> : <SubmitReport />}
        <button onClick={toggleDisplay}>
          {showStatus ? 'Submit Report' : 'Back to Status'}
        </button>
      </div>
    </ApolloProvider>
  );
};

export default PopupHome;
