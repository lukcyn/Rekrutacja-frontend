"use client";

import {useEffect, useState} from "react"
import {ApplicationInfoDTO} from "../../types/application"
import withRole from "@/middleware/withRole";
import {AppUserRole} from "@/enums/role";
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationBar from "@/components/paginationBar/PaginationBar";
import {PaginationParams} from "@/types/Page";
import {fetchAppUsersByNameAndSurname} from "@/api/appUserFetch";
import {useRouter} from "next/navigation";
import {AppUserDTO} from "@/types/AppUser";
import {useUserdataResult} from "@/context/userDataContext";


const UsersList = () => {
    const [applications, setApplications] = useState<ApplicationInfoDTO[]>([])
    const [selectedApplication, setSelectedApplication] = useState<ApplicationInfoDTO | null>(null)
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const router = useRouter();
    const [users, setUsers] = useState<AppUserDTO[]>([])
    const [selectedUser, setSelectedUser] = useState<AppUserDTO | null>(null)
    const {name, surname} = useUserdataResult()

    const [applicationFetchParams, setApplicationFetchParams] = useState<PaginationParams>({
        pageNumber: 0,
        size: 6
    })



    const fetchUsers = () => {
        fetchAppUsersByNameAndSurname(applicationFetchParams, name, surname)
            .then((response) => {
                console.log(response)
                setUsers(response)
                //setTotal(response.totalPages)
                //setCurrentPage(response.number)
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        fetchUsers()
        console.log(users);


        //fetchAppUsersByNameAndSurname(name, )
    }, [])

    const onPaginationBarClick = (pageNumber: number) => {
        setApplicationFetchParams({...applicationFetchParams, pageNumber: pageNumber})
        //fetchApplications()
        fetchUsers()
    }

    const handleApplicationSelected = (user: AppUserDTO) => {
        setSelectedUser(user)
        console.log(user)
        router.push("/showUserData/" + user.id);
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div>
                        <h2>Użytkownicy</h2>
                        <ul className="list-group">
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    className={`list-group-item ${selectedUser === user ? 'active' : ''}`}
                                    onClick={() => handleApplicationSelected(user)}
                                >
                                    {`Nr. ${user.id} ${user.name} ${user.surname} - ${user.role}`}
                                </li>
                            ))}
                            <PaginationBar

                                total={total}
                                current={currentPage}
                                onClick={onPaginationBarClick}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default withRole(UsersList, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
  