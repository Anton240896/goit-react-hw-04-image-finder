import React, { useState } from 'react';
import { ImageWraper } from './ImageGalleryItem.styled';
import { ModalWindow } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ImageWraper>
      <img
        onClick={openModal}
        src={webformatURL}
        alt={tags}
        loading="lazy"
        width="330"
        height="270"
      />
      <ModalWindow
        largeImageURL={largeImageURL}
        isOpenModal={isModalOpen}
        onCloseModal={closeModal}
        tags={tags}
      />
    </ImageWraper>
  );
};
