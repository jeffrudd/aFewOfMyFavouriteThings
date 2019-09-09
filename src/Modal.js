import React from 'react';

import './Modal.css';

const Modal = (props) => {
    return (
        <div className="modal-container"
            style={{
                // zIndex: 10,
            }}>
            <div className="modal-wrapper">
                <div className="modal-header">
                    <h3>Favourite {props.topic}</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    {/* <button className="btn-continue">CONTINUE</button> */}
                </div>
            </div>
        </div>
    )
}

export default Modal;