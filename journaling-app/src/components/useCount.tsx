import {createContext, useContext } from 'react';

type CountContextType = {
    heartcount: number;
    commentCount: number;
    incrementHeartCount: () => void;
    incrementCommentCount: () => void;
};

export const CountContext = createContext<CountContextType | undefined>(undefined);

export const useCount = () => {
    const context = useContext(CountContext);
    if (!context) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
};