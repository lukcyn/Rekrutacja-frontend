"use client";
import {AppUserRole} from "@/enums/role";
import withRole from "@/middleware/withRole";
//import { useRouter } from "next/navigation";
import {useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "react-bootstrap";
import {useRouter} from "next/navigation";
import {useUserdataResult} from "@/context/userDataContext";


interface Prop {
    params: {
        id: string;
    };
}

const UsersDataPage = ({params}: Prop) => {
    const router = useRouter();
    //const navigate = useNavigate();
    //const [name, setName] = useState<string>("");
    //const [surname, setSurname] = useState<string>("");

    const [formData, setFormData] = useState({
        name: '',
        surname: ''
    });
    const {setResult} = useUserdataResult()
    //const setSearchParams = useSearchParams();


    // const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    //     setName(event.target.value);
    // };
    //
    // const handleSurnameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    //     setSurname(event.target.value);
    // };

    const handleChange = (e: any) => {
        const {name, value} = e.target
        console.log(name + ": " + value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getUserData = () => {
        return {
            name: formData.name,
            surname: formData.surname
        };
    };

    const handleSubmit = () => {
        onButtonClick();
    }

    const name1 = formData.name
    const surname1 = formData.surname

    const onButtonClick = () => {
        //const userData = getUserData();

        if (formData.name.length > 20 || formData.surname.length > 20) {
            // Wyświetl alert lub inny komunikat o błędzie
            alert("Imię lub nazwisko nie może mieć więcej niż 20 znaków!");
            return; // Przerwij funkcję, aby uniknąć przekierowania w przypadku błędu
        }


        //setSearchParams({ name, surname });

        setResult(formData.name, formData.surname)

        router.push("/usersList");


        //navigate('/usersList', { state: { name1, surname1 } });
        //history.push('/usersList', { name1, surname1 });
        // router.push({
        //     pathname: '/usersList',
        //     query: { name, surname },
        // });

        //navigate('/usersList', {state: userData});
        // Możesz użyć funkcji do przekazania danych do innego miejsca w aplikacji lub wykonać inne odpowiednie akcje
        console.log(`Imię: ${formData.name}, Nazwisko: ${formData.surname}`);
    };


    return (
        <div>
            <h1>Podaj dane szukanego użytkownika</h1>
            <form>
                <div className="row">
                    <div className="col-2">
                        <p>Nazwisko:</p>
                    </div>
                    <div className="col-3">
                        <input
                            name="surname"
                            className="form-control"
                            placeholder="Enter value"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <p>Imię:</p>
                    </div>
                    <div className="col-3">
                        <input
                            name={"name"}
                            className="form-control"
                            placeholder="Enter value"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {/*<button*/}
                {/*    type="submit"*/}
                {/*    className="btn btn-primary"*/}
                {/*>*/}
                {/*    Submit*/}
                {/*</button>*/}
                <div className="row">
                    <div className="col-2">
                        <Button variant="primary" onClick={onButtonClick}>
                            Zatwierdź
                        </Button>
                    </div>
                </div>
            </form>
            {/*<button onClick={onButtonClick}>Zatwierdź</button>*/}
        </div>
    );
};

export default withRole(UsersDataPage, [
    AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
