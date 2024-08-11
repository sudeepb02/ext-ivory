import React from 'react';
import './Popup.css';
import Attestations from '../../containers/Attestations/Attestations';
import SiteStatus from '../../containers/Attestations/SiteStatus';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Ivory Shield</h2>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a> */}
        <SiteStatus />
        {/* <Attestations /> */}
      </header>
    </div>
  );
};

export default Popup;
