import { useState } from 'react';

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);

  const handleModalOpen = () => {
    setIsOpenModal(true);
    document.body.style.overflow = 'hidden';
  };
  const handleReviewModalOpen = () => {
    setIsOpenReviewModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setIsOpenReviewModal(false);
    setIsOpenModal(false);

    document.body.style.overflow = 'auto';
  };

  return {
    isOpenReviewModal,
    isOpenModal,
    handleReviewModalOpen,
    handleModalOpen,
    handleModalClose,
  };
};

export interface ModalType {
  isOpenModal: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
}
