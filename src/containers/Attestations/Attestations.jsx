import { EAS, SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';

const Attestations = () => {
  const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021'; // Base Sepolia
  const SCHEMA_REGISTRY_ADDRESS = '0x4200000000000000000000000000000000000020'; // Base Sepolia
  const RPC_URL =
    'https://base-sepolia.g.alchemy.com/v2/fsnUOifxtseIxdhw9Q5-OZk52F2hlSZY';

  const [easContract, setEasContract] = useState();
  const [schemaContract, setSechmaContract] = useState();
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);
  const [schemaData, setSchemaData] = useState(null);

  const fetchAttestation = async () => {
    const uid =
      '0xff08bbf3d3e6e0992fc70ab9b9370416be59e87897c3d42b20549901d2cccc3e';

    const attestation = await easContract.getAttestation(uid);

    console.log(attestation);
    setData(attestation);
  };

  const fetchSchema = async () => {
    const schemaUID =
      '0xf9d154f29979ed121d8e7d80e147061c1ce904fdecf4e4fd2b54e8d13300c1e9';

    const schemaRecord = await schemaContract.getSchema({ uid: schemaUID });

    console.log(schemaRecord);
    setSchemaData(schemaRecord);
  };

  useEffect(() => {
    const eas = new EAS(EAS_CONTRACT_ADDRESS);
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    eas.connect(provider);
    setEasContract(eas);

    const schemaRegistry = new SchemaRegistry(SCHEMA_REGISTRY_ADDRESS);
    schemaRegistry.connect(provider);
    setSechmaContract(schemaRegistry);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Ethereum Attestation Service</h2>
      <div>
        <button onClick={fetchAttestation}>Button 1</button>
        <h3>Schema Data</h3>
        <p>{schemaData}</p>
      </div>

      <div>
        <h3>Attestation Data</h3>
        <button onClick={fetchSchema}>Button 2</button>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default Attestations;
