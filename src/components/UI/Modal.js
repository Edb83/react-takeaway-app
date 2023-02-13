import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onCloseCart}></div>
}

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  )
}
const overlayElement = document.querySelector('#overlays');

const Modal = (props) => {
  return (
  <React.Fragment>
    {ReactDOM.createPortal(<Backdrop onCloseCart={props.onCloseCart}/>, overlayElement)}
    {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
  </React.Fragment>
  )
}

export default Modal;