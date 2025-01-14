import React from "react";

const Modal = (props) => {
    const closeModal = () => {
        props.setShowModal(false);
      };
     
    
  return (
    <>
      {props.showFlag ? ( // showFlagがtrueだったらModalを表示する
        <div class='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' >
            <div class='bg-white p-2.5 rounded-md'  >
                <p>{props.content}</p>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
        
      ) : (
        <></>// showFlagがfalseの場合はModalは表示しない
      )}
    </>
  );
};

export default Modal;


