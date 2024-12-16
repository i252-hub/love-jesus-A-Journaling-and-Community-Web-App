const Modal = ({isOpen, onClose, children}: any) => {
if (!isOpen) return null;
return(
    <>
    <div>
    <div onClick={(e)=> e.stopPropagation}>
        {children}
        <button onClick={onClose}></button>
    </div>
    </div>
    </>
)
}

export default Modal;