import { useCallback, useState } from 'react';

export const useHeroSelection = () => {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number | null>(
    null,
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = useCallback((index: number) => {
    setSelectedHeroIndex(index);
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedHeroIndex(null);
    setModalOpen(false);
  }, []);

  return {
    selectedHeroIndex,
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
