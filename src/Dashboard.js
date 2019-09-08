// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// class Dashboard extends Component {
//     state = { show: false };

//     showModal = () => {
//         this.setState({ show: true });
//     };

//     hideModal = () => {
//         this.setState({ show: false });
//     };

//     render() {
//         return (
//             <main>
//                 <h1>React Modal</h1>
//                 <Modal show={this.state.show} handleClose={this.hideModal}>
//                     <p>Modal</p>
//                     <p>Data</p>
//                 </Modal>
//                 <button type="button" onClick={this.showModal}>
//                     open
//                 </button>
//             </main>
//         );
//     }
// }

// const Modal = ({ handleClose, show, children }) => {
//     const showHideClassName = show ? "modal display-block" : "modal display-none";

//     return (
//         <div className={showHideClassname}>
//             <section className="modal-main">
//                 {children}
//                 <button onClick={handleClose}>close</button>
//             </section>
//         </div>
//     );
// };

// const container = document.createElement("div");
// document.body.appendChild(container);
// ReactDOM.render(<Dashboard />, container);