import React, { useState, useEffect } from 'react';
// import ResourceContents from './ResourceContent';

import { gql, useQuery } from '@apollo/client';

interface ResourceContent {
  id: string;
  name: string;
  content: string;
  contentHash: string;
  type: string;
  isScamCount: string;
  notScamCount: string;
}

interface GraphQLResponse {
  resourceContents: ResourceContent[];
}

// Define the GraphQL query
const GET_RESOURCE_CONTENTS = gql`
  {
    resourceContents {
      id
      name
      content
      contentHash
      type
      isScamCount
      notScamCount
    }
  }
`;

const SiteStatus = () => {
  // Set the url of the current page
  const [currentUrl, setCurrentUrl] = useState('');
  const [scamCount, setScamCount] = useState(0);

  const { loading, error, data } = useQuery<GraphQLResponse>(
    GET_RESOURCE_CONTENTS
  );

  const addScamCount = (count: number) => {
    setScamCount(scamCount + count);
    return '';
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.resourceContents.map((item) => (
        <div key={item.id}>{addScamCount(Number(item.isScamCount))}</div>
      ))}

      <h3>
        Current URL: <p>{currentUrl}</p>
        Scam Reports: <b>{scamCount}</b>
      </h3>
    </div>
  );
};

export default SiteStatus;
