import { useState } from "react";

export const useConfirmModal = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleClose = () => {
    setShowDeleteConfirmation(false);
  };

  const handleOpenConfirmModal = () => {
    setShowDeleteConfirmation(true);
  };

  return {
    showDeleteConfirmation,
    handleClose,
    handleOpenConfirmModal,
  };
};
