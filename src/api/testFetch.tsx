import axios from "./axios";

export const testApiCall = async () => { 
    axios.get('/test')
    .then((response) => {
        console.log("Api call successful");
    });
}

export const submitApplication = async () => { 
    axios.get('/submit-application')
    .then((response) => {
        console.log("Api call successful");
    });
}
