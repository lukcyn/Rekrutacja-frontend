import {createContext, ReactNode, useContext, useState} from "react";

type preferenceTestResultContextProps = {
    testResult: string[] | undefined
    setPreferenceTestResult: (testResult: string[]) => void;
}

const PreferenceTestResultContext = createContext<preferenceTestResultContextProps | undefined>(undefined);

export const PreferenceTestResultProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [testResult, setTestResult] = useState<string[]>();


    const setPreferenceTestResult = (
        testResult: string[]) => {
        setTestResult(testResult)
    }

    return (
        <PreferenceTestResultContext.Provider value={{setPreferenceTestResult, testResult}} >
            {children}
        </PreferenceTestResultContext.Provider>
    )

}

export const usePreferenceTestResult = (): preferenceTestResultContextProps => {
    const context = useContext(PreferenceTestResultContext)
    if(!context) {
        throw new Error("Blad")
    }
    return context
}