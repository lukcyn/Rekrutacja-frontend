import { ReactNode, createContext, useContext, useState } from "react";

type UserDataContextProps = {
    name: string | null;
    surname: string | null;
    setResult: (name: string, surname: string) => void;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(undefined);

export const UserDataProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')



    //const setName = (name: String)
    const setResult = (name: string, surname: string) => {
        setName(name)
        setSurname(surname)
    }

    return (
        <UserDataContext.Provider value={{setResult, name, surname}} >
            {children}
        </UserDataContext.Provider>
    )

}

export const useUserdataResult = (): UserDataContextProps => {
    const context = useContext(UserDataContext)
    if(!context) {
        throw new Error("Blad")
    }
    return context
}