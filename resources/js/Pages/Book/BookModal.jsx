import React, { useState } from "react";
import Modal from "./Modal"; //Modalコンポーネントをimportする

const BookModal = () => {
  const [showModal, setShowModal] = useState(false); // Modalコンポーネントの表示の状態を定義する
  const ShowModal = () => {
    setShowModal(true);
    };
  return (
    <>
      <button onClick={ShowModal}></button>
      {/* Appコンポーネントから子であるModalコンポーネントにpropsを渡す */}
      <Modal showFlag={showModal} setShowModal={setShowModal} content="親から渡された値です。" />
    </>
  );
};





export default BookModal;

