import axios from "axios";

export const getUsers = () => {
    return axios.get('https://randomuser.me/api/?results=200')
}