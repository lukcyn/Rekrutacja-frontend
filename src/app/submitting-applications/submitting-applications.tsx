import { useEffect, useState } from "react";
import { submitApplication } from "@/api/testFetch"


const SubmittingApplication = () => {

  useEffect(() => {
    submitApplication();
  }, []);

  const [formData, setFormData] = useState({
    imie: '',
    nazwisko: '',
    email: '',
  });

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
  }


  return (

    <form onSubmit={handleSubmit}>
      <label>
        Imię:
        <input type="text" name="imie" value={formData.imie} onChange={handleChange} />
      </label>
      <br />
      <label>
        Nazwisko:
        <input type="text" name="nazwisko" value={formData.nazwisko} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );

};

export default SubmittingApplication;