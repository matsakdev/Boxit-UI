import React, {useState} from 'react';
import {createPortal} from "react-dom";
import ModalContent from "./ModalContent";

const ModalPortal = (...props) => {
    console.log(props)
    const [showModal, setShowModal] = useState(true);

    const onCloseModal = () => {
        console.log('props', props)
        props.onClose();
        setShowModal(false);
    }

    return (
        <React.Fragment>
            {showModal && createPortal(
                <ModalContent onClose={onCloseModal} />,
                document.getElementById('modal-root')
            )}
        </React.Fragment>
    );
};

export default ModalPortal;
