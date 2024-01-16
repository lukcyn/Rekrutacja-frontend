"use client";
import { addApplication, getPreferencesNumbers } from "@/api/applicationFetch";
import { ApplicationDTO } from "@/types/application";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubmitResult } from "@/context/submitApplicationResultContext";
import { PUBLIC_DIR_MIDDLEWARE_CONFLICT } from "next/dist/lib/constants";
import { AppUserRole } from "@/enums/role";
import withRole from "@/middleware/withRole";
import { getActiveFieldOfStudiesNames } from "@/api/recruitmentFetch";


const SubmittingApplication = () => {

  const router = useRouter();
  const { setResult } = useSubmitResult()

  const [preferencesNumbers, setPreferencesNumbers] = useState<number[]>([])

  useEffect(() => {
    if(preferencesNumbers.length === 0) {
      getPreferencesNumbers()
      .then((response) => {
        console.log(response)
        setPreferencesNumbers(response)
      })
      .catch((error) => {
        console.log(error)
      })
    }

  }, [])


  const [fieldOfStudies, setFieldOfStudies] = useState<string[]>([])

  const [formData, setFormData] = useState({
    fieldOfStudy: '',
    preferencesNumber: 0
  });

  useEffect(() => {

    getActiveFieldOfStudiesNames()
    .then((response) => {
      setFieldOfStudies(response)
      setFormData({
        fieldOfStudy: response[0],
        preferencesNumber: 0
      })
    })
    .catch((error) => {
      console.log(error)
    })

  }, [])


  const handleChange = (e: any) => {
    const { name, value } = e.target
    console.log(name + ": " + value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    console.log("Submit");

    e.preventDefault();
    const application = createApplication()
    console.log(application)

    addApplication(application)
      .then((response: ApplicationDTO) => {
        console.log("OK")
        console.log(response)
        setResult(`Podanie zostalo zlozone pomyslnie z wynikiem rekrutacyjnym: ${response.recruitmentIndicator}`)
      })
      .catch((error) => {
        console.log(error.response.data)
        setResult(error.response.data)
      })
      .finally(() => {
        router.push('/home/candidate')
      })

  }

  const createApplication = (): ApplicationDTO => {

    return {
      preferencesNumber: formData.preferencesNumber,
      fieldOfStudy: formData.fieldOfStudy
    }

  }

  const checkPreferencesNumber = preferencesNumbers.includes(Number(formData.preferencesNumber.toString()))

  return  (
    <div className="container xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Wybierz kierunek:</label>
          <select
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            className="form-select"
          >
            {fieldOfStudies.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Numer preferencji:</label>
          <input
            type="number"
            name="preferencesNumber"
            value={formData.preferencesNumber}
            onChange={handleChange}
            className="form-control"
            min="0"
          />
          {checkPreferencesNumber && (
            <small className="text-danger">
              Istnieje już podanie z podanym numerem preferencji
            </small>
          )}
        </div>
        <button
          disabled={checkPreferencesNumber}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );

};

export default withRole(SubmittingApplication, [AppUserRole.CANDIDATE]);