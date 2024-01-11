"use client";

import axios from "axios"
import { useEffect, useState } from "react"
import { ApplicationInfoDTO } from "../../types/application"
import withRoles from "@/middleware/withRole";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { getApplications } from "@/api/applicationFetch";
import 'bootstrap/dist/css/bootstrap.min.css';



const Applications = () => {

    const [applications, setApplications] = useState<ApplicationInfoDTO[]>([])
    const [selectedApplication, setSelectedApplication] = useState<ApplicationInfoDTO | null>(null)


    useEffect(() => {
        getApplications()
        .then((response) => {
            setApplications(response)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])

    const handleApplicationSelected = (application: ApplicationInfoDTO) => {
        setSelectedApplication(application)
        console.log(applications)
    }

    return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h2>Applications</h2>
                <ul className="list-group">
                  {applications.map((application) => (
                    <li
                      key={application.id}
                      className={`list-group-item ${selectedApplication === application ? 'active' : ''}`}
                      onClick={() => handleApplicationSelected(application)}
                    >
                      {`Nr. ${application.id} ${application.firstname} ${application.lastname} - ${application.fieldOfStudyName}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
    
            <div className="col-md-6">
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
          </div>
        </div>
      );

}

export default withRole(Applications, [AppUserRole.ADMINISTRATION_EMPLOYEE]);
  