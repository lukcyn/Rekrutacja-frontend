import {createContext, ReactNode, useContext, useState} from "react";
import {MaturaSubjectDTO} from "@/types/MaturaSubject";

type maturaSubjectsContextProps = {
    firstSubject: string | undefined;
    secondSubject: string | undefined;
    thirdSubject: string | undefined;
    setMaturaSubjectsResult: (
        firstSubject: MaturaSubjectDTO | undefined,
        secondSubject: MaturaSubjectDTO | undefined,
        thirdSubject: MaturaSubjectDTO | undefined) => void;
}

const MaturaSubjectsContext = createContext<maturaSubjectsContextProps | undefined>(undefined);

export const MaturaSubjectsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [firstSubject, setFirstSubject] = useState<string | undefined>(undefined);
    const [secondSubject, setSecondSubject] = useState<string | undefined>(undefined);
    const [thirdSubject, setThirdSubject] = useState<string | undefined>(undefined);


    const setMaturaSubjectsResult = (
        firstSubject: MaturaSubjectDTO | undefined,
        secondSubject: MaturaSubjectDTO | undefined,
        thirdSubject: MaturaSubjectDTO | undefined) => {
        setFirstSubject(firstSubject?.name)
        setSecondSubject(secondSubject?.name)
        setThirdSubject(thirdSubject?.name)
    }

    return (
        <MaturaSubjectsContext.Provider value={{setMaturaSubjectsResult, firstSubject, secondSubject, thirdSubject}}>
            {children}
        </MaturaSubjectsContext.Provider>
    )

}

export const useMaturaSubjectsResul = (): maturaSubjectsContextProps => {
    const context = useContext(MaturaSubjectsContext)
    if (!context) {
        throw new Error("Blad")
    }
    return context
}