import React, { useState, useEffect } from 'react';
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
const GET_RESOURCE_CONTENTS = (siteUrl: string) => gql`
{
  resourceContents(where: {
    content_contains: "${siteUrl}"
  }) {
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
  const [currentUrl, setCurrentUrl] = useState('');
  const [scamCount, setScamCount] = useState(0);

  const { loading, error, data } = useQuery<GraphQLResponse>(
    GET_RESOURCE_CONTENTS(currentUrl)
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });
  }, []);

  useEffect(() => {
    if (data) {
      const totalScamCount = data.resourceContents.reduce(
        (acc, item) => acc + Number(item.isScamCount),
        0
      );
      setScamCount(totalScamCount);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.resourceContents.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <p>Current URL: {currentUrl}</p>
      <h4>
        Scam Reports: <b>{scamCount}</b>
      </h4>
    </div>
  );
};

export default SiteStatus;
