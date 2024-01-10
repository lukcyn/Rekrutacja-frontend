"use client";
import { addApplication, getPreferencesNumbers } from "@/api/applicationFetch";
import { ApplicationDTO } from "@/types/application";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubmitResult } from "@/context/submitApplicationResultContext";
import { PUBLIC_DIR_MIDDLEWARE_CONFLICT } from "next/dist/lib/constants";


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

  }, [preferencesNumbers])


  const fetchFieldOfStudies = async () => {

    try {
      const response = await fetch("http://localhost:8080/field-of-study/names", {
        method: 'GET'
      })

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        console.log("Blad podczas zaciagania nazw kierunkow studiow")
      }

    } catch (error) {
      console.log(error)
    }

  }

  const [fieldOfStudies, setFieldOfStudies] = useState([])

  const [formData, setFormData] = useState({
    fieldOfStudy: '',
    preferencesNumber: 0
  });


  useEffect(() => {
    const fetchDataAndCreateForm = async () => {
      try {
        const data = await fetchFieldOfStudies()
        setFieldOfStudies(data)
        setFormData({
          fieldOfStudy: data[0],
          preferencesNumber: 0
        })
      } catch (e) {
        console.log(e)
      }
    }
    if (fieldOfStudies.length === 0) {
      fetchDataAndCreateForm()
    }
  }, [fieldOfStudies])


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
      .then(() => {
        // router.push('/home/candidate')
        console.log("OK")
        setResult("Podanie zostalo zlozone pomyslnie")
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

  return (

    <form onSubmit={handleSubmit}>
      <label>
        Wybierz kierunek:
        <select name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} >
          {fieldOfStudies.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))
          }
        </select>
      </label>
      <br />
      <label>
        Numer preferencji :
        <input type="preferencesNumber" name="preferencesNumber" value={formData.preferencesNumber} onChange={handleChange} />
      </label>
      {checkPreferencesNumber && (
        <p style={{ color: 'red' }}>Istnieje juz podanie z podanym numerem preferencji</p>
      )}
      <br />
      <button type="submit">Submit</button>
    </form>
  );

};

export default SubmittingApplication;