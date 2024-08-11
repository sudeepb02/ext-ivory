import React from 'react';
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

// Create a React component to fetch and display data
const ResourceContents: React.FC = () => {
  const { loading, error, data } = useQuery<GraphQLResponse>(
    GET_RESOURCE_CONTENTS
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.resourceContents.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>
            Content: <a href={item.content}>{item.content}</a>
          </p>
          <p>Content Hash: {item.contentHash}</p>
          <p>Type: {item.type}</p>
          <p>Is Scam Count: {item.isScamCount}</p>
          <p>Not Scam Count: {item.notScamCount}</p>
        </div>
      ))}
      import ReactDOM from 'react-dom';
    </div>
  );
};

export default ResourceContents;
