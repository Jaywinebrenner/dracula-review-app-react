// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();
export { ModalContext };
export const ModalProvider = ({ children }) => {
    
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);
  const [addDraculaModalIsOpen, setIsDraculaModalOpen] = useState(false);
  const [addDetailIsOpen, setAddDetailIsOpen] = useState(false);
  const [addReviewIsOpen, setAddReviewIsOpen] = useState(false);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);

  const handleLoginIsOpen = () => {
    setLoginIsOpen(prev => !prev);
  };
  const handleSignupIsOpen = () => {
    setSignupIsOpen(prev => !prev);
  };
  const handleAddDraculaModalOpen = () => {
    setIsDraculaModalOpen(prev => !prev);
  };
  const handleAddDetailOpen = () => {
    setAddDetailIsOpen(prev => !prev);
  };
  const handleAddReviewOpen = () => {
    setAddReviewIsOpen(prev => !prev);
  };



  const handleAreYouSureOpen = () => {
    setAreYouSureIsOpen(prev => !prev);
  };


  return (
    <ModalContext.Provider
      value={{
          handleLoginIsOpen,
          loginIsOpen,
          handleSignupIsOpen,
          signupIsOpen,
          addDraculaModalIsOpen,
          handleAddDraculaModalOpen,
          addDetailIsOpen,
          handleAddDetailOpen,
          addReviewIsOpen,
          handleAddReviewOpen,
          
          areYouSureIsOpen,
          handleAreYouSureOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
