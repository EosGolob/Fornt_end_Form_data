import axios from "axios";
const  REST_API_BASE_URL = 'http://localhost:9090/api/employees';
const creatEmployeePostUrl = 'createEmployee';
export const creatEmployee = (employee) => axios.post(REST_API_BASE_URL+'/'+creatEmployeePostUrl,employee);