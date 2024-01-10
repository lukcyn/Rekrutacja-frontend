import { ReactNode, createContext, useContext, useState } from "react";

type SubmitResultContextProps = {
    submitResult: string | null;
    setResult: (result: string | null) => void;
}

const SubmitApplicationResultContext = createContext<SubmitResultContextProps | undefined>(undefined);

export const SubmitApplicationResultProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [submitResult, setSubmitResult] = useState(null)

    const setResult = (result: any) => {
        setSubmitResult(result)
    }

    return (
        <SubmitApplicationResultContext.Provider value={{submitResult, setResult: setResult}} >
            {children}
        </SubmitApplicationResultContext.Provider>
    )

}

export const useSubmitResult = (): SubmitResultContextProps => {
    const context = useContext(SubmitApplicationResultContext)
    if(!context) {
        throw new Error("Blad")
    }
    return context
}