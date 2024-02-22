// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();
export { ModalContext };
export const ModalProvider = ({ children }) => {
  const [draculaToDelete, setDraculaToDelete] = useState()
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [signupIsOpen, setSignupIsOpen] = useState(false);
  const [addDraculaModalIsOpen, setIsDraculaModalOpen] = useState(false);
  const [addDetailIsOpen, setAddDetailIsOpen] = useState(false);
  const [addReviewIsOpen, setAddReviewIsOpen] = useState(false);
  const [editReviewIsOpen, setEditReviewIsOpen] = useState(false);
  const [areYouSureIsOpen, setAreYouSureIsOpen] = useState(false);
  const [areYouSureDeleteReviewOpen, setAreYouSureDeleteReviewOpen] = useState(false);
  const [thisDraculaId, setThisDraculaId] = useState();
  const [thisDracula, setThisDracula] = useState(false);
  const [thisDraculaStarAverage, setThisDraculaStarAverage] = useState(false);



  const [clickedReviewToEdit, setClickedReviewToEdit] = useState()

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
  const handleEditReviewOpen = () => {
    setEditReviewIsOpen(prev => !prev);
  };

  const removeHome = () => {
    if(
        loginIsOpen ||
        signupIsOpen ||
        addDraculaModalIsOpen ||
        addDetailIsOpen ||
        addReviewIsOpen ||
        areYouSureIsOpen ||
        editReviewIsOpen
    )
        {
            return true;
    } else {
        return false;
    }
  }



  const handleAreYouSureOpen = () => {
    setAreYouSureIsOpen(prev => !prev);
  };

  const handleAreYouSureDeleteReviewOpen = () => {
    setAreYouSureDeleteReviewOpen(prev => !prev);
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
          editReviewIsOpen,
          handleEditReviewOpen,
          removeHome,
          setDraculaToDelete,
          draculaToDelete,
          handleAreYouSureDeleteReviewOpen,
          areYouSureDeleteReviewOpen,

          areYouSureIsOpen,
          handleAreYouSureOpen,
          setClickedReviewToEdit,
          clickedReviewToEdit,
          setThisDraculaStarAverage,
          thisDraculaStarAverage,
          thisDracula,
          setThisDracula,
          setThisDraculaId,
          thisDraculaId,
          setAddDetailIsOpen

      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
