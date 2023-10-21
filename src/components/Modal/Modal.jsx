import ReactModal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { useEffect, useState } from 'react';

// export const CloseWindow = () => {
//   const [close, setClose] = useState(false);

//   useEffect(() => {

//     const escKeyPress = (evt) => {
//       if(evt.key === 'Esvape' && ) {

//       }
//     }
//   });
const stylesModal = {
  content: {
    top: '50%',
    right: 'auto',
    bottom: 'auto',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -43%)',
    backgroundImage:
      'radial-gradient(circle, #010102 70%, rgb(13, 27, 77) 80%)',
  },
};

ReactModal.setAppElement('#root');

export const ModalWindow = ({
  isOpenModal,
  onCloseModal,
  largeImageURL,
  tags,
}) => {
  return (
    <ReactModal
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
      style={stylesModal}
      contentLabel="Image Modal"
    >
      {/* <div>
          <button type="button" onClick={closeModal}>
            <AiOutlineCloseCircle size={70} />
          </button>
        </div> */}

      <img src={largeImageURL} alt={tags} width="700px" height="530px" />
    </ReactModal>
  );
};
// };
