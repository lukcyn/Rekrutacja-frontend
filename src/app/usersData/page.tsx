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
    const [formData, setFormData] = useState({
        name: '',
        surname: ''
    });
    const {setResult} = useUserdataResult()

    const handleChange = (e: any) => {
        const {name, value} = e.target
        console.log(name + ": " + value);
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onButtonClick = () => {

        if (formData.name.length > 20 || formData.surname.length > 20) {
            alert("Imię lub nazwisko nie może mieć więcej niż 20 znaków!");
            return;
        }

        setResult(formData.name, formData.surname)

        router.push("/usersList");

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
                <div className="row">
                    <div className="col-2">
                        <Button variant="primary" onClick={onButtonClick}>
                            Zatwierdź
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRole(UsersDataPage, [
    AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
