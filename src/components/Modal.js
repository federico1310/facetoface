import React from 'react';

const Modal = props => {

	return (
		<div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClose}>
			<div className="modal-content" onClick={e => e.stopPropagation()}>
				<div className="modal-header">
					{props.title}
				</div>
				<div className="modal-body">
					{props.children}
				</div>
				<div className="modal-footer">
					<button onClick={props.onClose} className="button flex justify-center items-center buttonGral hover:bg-gray-400 py-2 px-4 text-white rounded text-xs uppercase font-bold">Cerrar</button>
				</div>
			</div>
		</div>
	)
}

export default Modal;