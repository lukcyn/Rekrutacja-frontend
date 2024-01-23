"use client";

import React from "react"
import withRole from "@/middleware/withRole";
import {AppUserRole} from "@/enums/role";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useRouter} from "next/navigation";
import {Button} from "react-bootstrap";
import {usePreferenceTestResult} from "@/context/preferenceTestResultContext";


const TestResult = () => {

    const router = useRouter();
    const {testResult} = usePreferenceTestResult()


    const onButtonClick = () => {
        router.push("/home/candidate");
    };


    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <h2>Twoje wyniki testu</h2>
                        <ul className="list-group">
                            {testResult?.map((element, index) => (
                                <li key={index} className={`list-group-item`}>
                                    {element}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <p></p>
            </div>
            <div className="row">
                <div className="col-3">
                    <Button variant="primary" onClick={onButtonClick}>
                        Wróć do strony głównej
                    </Button>
                </div>
            </div>
        </div>
    );

}

export default withRole(TestResult, [AppUserRole.CANDIDATE]);
