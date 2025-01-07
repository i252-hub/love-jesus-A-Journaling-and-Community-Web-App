type EntryProps ={
    value: string
    placeholder: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    label: string
    hideButton: boolean
}

const Entry: React.FC<EntryProps> = ({onChange, value, placeholder, label, hideButton, onClick}) => {
    if (hideButton) return null;
    return(
        <>
        <input 
        type="text"
         value={value}
         placeholder={placeholder}
         onChange={onChange} />
       
        <button
        onClick={onClick}
        type="submit"
      >
        {label}
      </button>
        <textarea
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        ></textarea>
        </>
    )
    
}

export default Entry;