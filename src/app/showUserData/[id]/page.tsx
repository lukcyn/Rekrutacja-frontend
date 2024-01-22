"use client";
import {AppUserRole} from "@/enums/role";
import withRole from "@/middleware/withRole";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {AppUserDTO} from "@/types/AppUser";
import {fetchAppUserById} from "@/api/appUserFetch";

interface Prop {
    params: {
        id: string;
    };
}

const RecruitmentViewPage = ({params}: Prop) => {
    const router = useRouter();
    //const [recruitment, setRecruitment] = useState<RecruitmentDTO>();
    const [user, setUser] = useState<AppUserDTO>();

    useEffect(() => {
        const id = verifyAndGetIdFromParams();
        fetchUserdata(id);
    }, []);

    const verifyAndGetIdFromParams = () => {
        if (params.id === undefined)
            router.push("/notFound");

        const id = parseInt(params.id);

        if (isNaN(id))
            router.push("/notFound");

        return id;
    };

    const fetchUserdata = (id: number) => {
        fetchAppUserById(id)
            .then((response) => {
                console.log(response);
                setUser(response);
            })
            .catch((error) => {
                if (error.response.status === 404)
                    router.push("/notFound");
            });
    };


    return (
        <div>
            {user ? (
                <>
                    {/*<h1>{recruitment.fieldOfStudy.name + " " + recruitment.cycle}</h1>*/}
                    <p>Nazwisko: {user.surname}</p>
                    <p>Imię: {user.name}</p>
                    <p>PESEL: {user.pesel}</p>
                    <p>Rola: {user.role}</p>
                    <p>Data urodzenia: {user.dateOfBirth}</p>
                    <p>E-mail: {user.email}</p>
                    <p>Login: {user.login}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default withRole(RecruitmentViewPage, [
    AppUserRole.ADMINISTRATION_EMPLOYEE,
]);
