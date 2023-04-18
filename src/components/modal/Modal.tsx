import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

type AppProps = {
    children: React.ReactNode;
};

const Modal = ({children}: AppProps) => {

    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    document.body.appendChild(modalRoot);

    return ReactDOM.createPortal(
        <div className="ModalBackground">
            <div className='content-modal'>
                {children}
            </div>
        </div>,
        document.getElementById('modal')!
    );
}
export default Modal;