import axios from "axios";


// I'm using a mock API, to imitate how the API works.
class DepartmentService {
  constructor() {
    this.getAllDepartments = this.getAllDepartments.bind(this);
    this.getDepartmentById = this.getDepartmentById.bind(this);
    this.createDepartment = this.createDepartment.bind(this);
    this.updateDepartment = this.updateDepartment.bind(this);
    this.deleteDepartment = this.deleteDepartment.bind(this);
  }

  BASE_URL = "http://localhost:8097/departments";

  async getAllDepartments() {
    try {
      const res = await axios.get(this.BASE_URL);
      return { Data: res.data };
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  getDepartmentById(id) {
    return axios.get(`${this.BASE_URL}/${id}`);
  }

  async createDepartment(department) {
    try {
      const res = await axios.post(`${this.BASE_URL}/add`, department);
      return { DepartmentId: res.data.DepartmentId };
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  async updateDepartment(department) {
    try {
      await axios.put(`${this.BASE_URL}`, department);
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  async deleteDepartment(id) {
    try {
      await axios.delete(`${this.BASE_URL}/${id}`);
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }
}

const departmentService = new DepartmentService();

export default departmentService;