{/* 

import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid'


type Modals = {
    isOpen: boolean
    onClose: ()=> void
    children: React.ReactNode


}

const Modal = ({isOpen, onClose, children}: Modals) => {
if (!isOpen) return null;
return  ReactDOM.createPortal(
   
    <div className="bg-customBrown top-0 h-full w-full absolute flex justify-center items-center mobile:hidden">
    <div className="bg-customYellow w-[35%] h-[85%] relative tablet:w-[80%]" onClick={(e)=> e.stopPropagation()}>
    <div className='w-full  flex justify-end'>
    <button onClick={onClose}><XMarkIcon className='w-6 h-6 fill-customBrown'/></button>
    </div>
        {children}
   
        
    </div>
    </div>,
    document.body
   
)
}

export default Modal;

*/}