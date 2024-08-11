# Ivory Shield

Ivory Shield is a system using the EthereumAttestation Service (EAS) to identify any scam, fraud, or phishing content by creating a repository of crowd-sourced Attestations signalling such attempts.

The solution builds a browser extension - Ivory Shield, that alerts users about reported sites when visited and also provides them with the option to report any site.

## How it works

The extension using Ethereum Attestation Service to identify scam and fraud sites online. The system consists of the following components:

### Ivory Shield Extension

An extension that alerts users based on the past attestations to the Site URLs

### Ivory Shield Subgraph

A custom subgraph developed for the project that indexes data from the relevant schemas and attestation to build a repository of data from scam reports

- [Subgraph Playground](https://thegraph.com/studio/subgraph/ivory-shield/playground)

- [Subgraph Source code](https://github.com/sudeepb02/ivory-shield-subgraph)

### Ethereum Attestation Service

The backbone of the entire system, powering crowd-source reporting and identification for scams

## Base Sepolia EAS Details

- Content Schema: https://base-sepolia.easscan.org/schema/view/0xf9d154f29979ed121d8e7d80e147061c1ce904fdecf4e4fd2b54e8d13300c1e9

- Content Vote Schema : https://base-sepolia.easscan.org/schema/view/0xd5315809392500715f3506109907ae09ae62e113560b2fa9c7d739752581d6c9
