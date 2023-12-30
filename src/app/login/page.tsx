"use client";
import { useUserRole } from "@/context/UserRoleContext";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {userRole, setUserRole} = useUserRole();
  const router = useRouter();


  const onLoginClick = async (e: SyntheticEvent) => {
    e.preventDefault();

    login(username, password).then((data) => {
      setUserRole(data.role);
      
      Cookies.set('token', data.token, { expires: 1 });
      Cookies.set('role', data.role, { expires: 1 });

      router.push("/");
    }).catch((error) => {
      if(error.response.status === 401)
        toast.error("Niepoprawne dane logowania!");
    });
  }

  return (
    <>
      <div className="container mt-3">
        <div className="row justify-content-center p-4">
          <div className="col-md-6">
            <h1>Zaloguj się</h1>
            <form className="border border-dark rounded mt-3 p-3 bg-light" onSubmit={ onLoginClick }>
              <div className="mt-3 mb-3">
                <label className="col-2" htmlFor="username">
                  Login:
                </label>
                <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="border border-dark rounded bg-light text-black w-100"
                />
              </div>

              <div className="mt-3 mb-4">
                <label className="col-2" htmlFor="password">
                  Hasło:
                </label>
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="border border-dark rounded bg-light text-black w-100"
                />
              </div>
              <div className="row mx-1">
                <button className="btn btn-primary">Zaloguj się</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}
