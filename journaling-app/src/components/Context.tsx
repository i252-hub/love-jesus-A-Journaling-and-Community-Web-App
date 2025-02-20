import  {  useState, ReactNode } from 'react';
import { CountContext } from './useCount'; 



export const CountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [heartcount, setHeartCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);

    const incrementHeartCount = () => setHeartCount(heartcount + 1);
    const incrementCommentCount = () => setCommentCount(commentCount + 1);

    return (
        <CountContext.Provider value={{ heartcount, commentCount, incrementHeartCount, incrementCommentCount }}>
            {children}
        </CountContext.Provider>
    );
};

