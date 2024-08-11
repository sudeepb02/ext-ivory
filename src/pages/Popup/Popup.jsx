import React from 'react';
import './Popup.css';
import PopupHome from '../../containers/PopupContainers/PopupHome';

const Popup = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Ivory Shield</h2>
        <PopupHome />
      </header>
    </div>
  );
};

export default Popup;
