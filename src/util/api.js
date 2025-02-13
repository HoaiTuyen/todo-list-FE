import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
    const URL_CREATE_API = '/v1/api/register';
    const data = {name, email, password}
    return axios.post(URL_CREATE_API, data);
}
const loginUserApi = ( email, password) => { 
    const URL_LOGIN_API = '/v1/api/login';
    const data = {email, password}
    return axios.post(URL_LOGIN_API, data);
}
const getTodo = () => {
    const URL_TODO_LIST = 'v1/api/todos';
    return axios.get(URL_TODO_LIST);
}
const createTodo = (title) => {
    const URL_CREATE_TODO = 'v1/api/add_todos';
    const data = {title}
    console.log(data);
    
    return axios.post(URL_CREATE_TODO, data)
}
const deleteTodo = (id) => { 
    const URL_CREATE_TODO = `v1/api/deleteTodo/${id}`;
    return axios.delete(URL_CREATE_TODO);
}
export {
    createUserApi, loginUserApi, getTodo, createTodo, deleteTodo
}