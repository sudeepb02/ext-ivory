import 'dotenv/config';
import React, { useState, useEffect } from 'react';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';

const EAS_CONTRACT_ADDRESS = '0x4200000000000000000000000000000000000021'; // Base Sepolia
const SCHEMA_REGISTRY_ADDRESS = '0x4200000000000000000000000000000000000020'; // Base Sepolia
const RPC_URL =
  'https://base-sepolia.g.alchemy.com/v2/fsnUOifxtseIxdhw9Q5-OZk52F2hlSZY';

export const RESOURCE_CONTENT_SCHEMA =
  '0xf9d154f29979ed121d8e7d80e147061c1ce904fdecf4e4fd2b54e8d13300c1e9';

export const VOTE_CONTENT_SCHEMA =
  '0xd5315809392500715f3506109907ae09ae62e113560b2fa9c7d739752581d6c9';

export const BYTES32_ZERO =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export const SubmitReport = () => {
  const [formData, setFormData] = useState({
    reason: '',
    info: '',
  });

  const [currentUrl, setCurrentUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

  const getEasContract = (): EAS => {
    console.log('Creating eas contract instance...');
    const eas = new EAS(EAS_CONTRACT_ADDRESS);
    if (wallet) {
      eas.connect(wallet);
      return eas;
    } else {
      throw Error('Wallet is not connected');
    }
  };

  const encodeResourceData = (name: string, content: string) => {
    const contentSchemaEncoder = new SchemaEncoder(
      'string name,string content,bytes32 contentHash,uint8 type'
    );

    const encodedData = contentSchemaEncoder.encodeData([
      { name: 'name', value: name, type: 'string' },
      { name: 'content', value: content, type: 'string' },
      { name: 'contentHash', value: BYTES32_ZERO, type: 'bytes32' },
      { name: 'type', value: 0, type: 'uint8' },
    ]);

    return encodedData;
  };

  const encodeVoteData = (resourceId: string, reason: string, info: string) => {
    const voteSchemaEncoder = new SchemaEncoder(
      'bytes resourceId,bool isScam,string reason,string info'
    );

    const encodedData = voteSchemaEncoder.encodeData([
      { name: 'resourceId', value: resourceId, type: 'bytes' },
      { name: 'isScam', value: true, type: 'bool' },
      { name: 'reason', value: reason, type: 'string' },
      { name: 'info', value: info, type: 'string' },
    ]);

    return encodedData;
  };

  const createResourceAttestation = async (name: string, content: string) => {
    console.log('Creating resource attestation...');
    const easContract = getEasContract();

    const encodedData = encodeResourceData(name, content);
    const transaction = await easContract.attest({
      schema: RESOURCE_CONTENT_SCHEMA,
      data: {
        recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
        revocable: true,
        data: encodedData,
      },
    });

    const receipt = await transaction.wait();
    console.log('New attestation UID:', receipt);
    console.log('Transaction receipt:', receipt);

    return receipt;
  };

  const createVoteAttestation = async (
    resourceId: string,
    reason: string,
    info: string
  ) => {
    console.log('Creating vote attestation...');
    const easContract = getEasContract();
    const encodedData = encodeVoteData(resourceId, reason, info);
    const transaction = await easContract.attest({
      schema: VOTE_CONTENT_SCHEMA,
      data: {
        recipient: '0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165',
        revocable: true,
        data: encodedData,
      },
    });

    const receipt = await transaction.wait();
    console.log('New attestation UID:', receipt);
    console.log('Transaction receipt:', receipt);

    return receipt;
  };

  const setUp = async () => {
    console.log('Setting up....');
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider);
    setWallet(wallet);
  };

  useEffect(() => {
    setUp();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        setCurrentUrl(tabs[0].url);
      }
    });

    const title = document.title;
    setPageTitle(title);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    console.log('Submitting Form');
    const resourceUid = await createResourceAttestation(pageTitle, currentUrl);
    const voteUid = await createVoteAttestation(
      resourceUid,
      formData.reason,
      formData.info
    );

    console.log('Form submitted');
    console.log('Resource ID of attestation:', resourceUid);
    console.log('Vote ID of attestation:', voteUid);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Reason:
          <input
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
          />
        </label>
      </div>
      <div>
        <label>
          Content:
          <textarea
            name="info"
            value={formData.info}
            onChange={handleChange}
            placeholder="Any other additional info "
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SubmitReport;
