import { axiosPublic, axiosPrivate } from "./axios";

export const testApiCall = async () => { 
    axiosPublic.get('/test')
    .then((response) => {
        console.log("Api call successful");
    });
}

export const testApiCallSecured = async () => {
    axiosPrivate.get('/test/secured')
    .then((response) => {
        console.log("Api call successful");
    });
}
