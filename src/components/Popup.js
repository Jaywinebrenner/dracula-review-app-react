
import React, { useState } from 'react'


function Popup({handleOpenPopup}) {

  return (
      <div className="popup">
            <h1 onClick={handleOpenPopup} className="padding-x">x</h1>
            <h3>Sign up to Review Draculas!</h3>
            <p>Review 3 Draculas and you can create your OWN Dracula!</p>
      </div>
  );
}

export default Popup;
