"use client";

import axios from "axios"
import { useEffect, useState } from "react"
import { ApplicationInfoDTO } from "../../types/application"
import withRoles from "@/middleware/withRole";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";


const Applications = () => {

    const [applications, setApplications] = useState<ApplicationInfoDTO[]>([])
    const [selectedApplication, setSelectedApplication] = useState<ApplicationInfoDTO | null>(null)


    useEffect(() => {
        axios.get("http://localhost:8080/application")
            .then(response => setApplications(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleApplicationSelected = (application: ApplicationInfoDTO) => {
        setSelectedApplication(application)
        console.log(applications)
    }

    return (
        <div>
            <div>
                <h2>Applications</h2>
                <ul>
                    {applications.map((application) => (
                        <li key={application.id} onClick={() => handleApplicationSelected(application)}>
                            {`Nr. ${application.id} ${application.firstname} ${application.lastname} - ${application.fieldOfStudyName}`}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Application Details</h2>
                {selectedApplication && (
                    <div>
                        <p>Application Number: {selectedApplication.id}</p>
                        <p>Application Author: {`${selectedApplication.firstname} ${selectedApplication.lastname}`}</p>
                        <p>Field Of Study: {selectedApplication.fieldOfStudyName}</p>
                        <p>Preferences Number: {selectedApplication.preferencesNumber}</p>
                        <p>Status: {selectedApplication.applicationStatus}</p>
                        <p>Recruitment Indicator: {selectedApplication.recruitmentIndicator}</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default withRole(Applications, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
  