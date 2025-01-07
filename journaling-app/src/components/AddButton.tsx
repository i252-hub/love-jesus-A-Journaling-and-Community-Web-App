import { Link } from "react-router-dom";
import { PlusCircleIcon} from '@heroicons/react/24/solid';

const AddButton = () => {



    return(
        <>
        <Link to="/journalentry">
        <PlusCircleIcon className="w-[6rem] h-[4rem] fill-customBrown"/>
        </Link>
                   
        </>
      
       
    )
}

export default AddButton;