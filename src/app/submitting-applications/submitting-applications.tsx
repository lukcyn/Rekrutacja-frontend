import { useEffect, useState } from "react";


const SubmittingApplication = () => {

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
      } catch(e) {
        console.log(e)
      }
    }
    if(fieldOfStudies.length === 0){
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

    try {
      console.log(JSON.stringify(formData))
      const response = await fetch("http://localhost:8080/application/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json();

        console.log(error);
      }

    } catch (error) {
      console.log(error)
    }

  }

  const createApplication = async () => {



  }


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
      <br />
      <button type="submit">Submit</button>
    </form>
  );

};

export default SubmittingApplication;