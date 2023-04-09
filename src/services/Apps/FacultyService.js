import axios from 'axios';


// I'm using a mock API, to imitate how the API works.
class FacultyService {
  constructor() {
    this.getAllFaculties = this.getAllFaculties.bind(this);
    this.getFacultyById = this.getFacultyById.bind(this);
    this.createFaculty = this.createFaculty.bind(this);
    this.updateFaculty = this.updateFaculty.bind(this);
    this.deleteFaculty = this.deleteFaculty.bind(this);
  }

  BASE_URL = 'http://localhost:8097/faculties';

  async getAllFaculties() {
    try{
    const res = await axios.get(this.BASE_URL);
    return {Data: res.data};
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  getFacultyById(id) {
    return axios.get(`${this.BASE_URL}/${id}`);
  }

  async createFaculty(faculty) {
    try {
      const res = await axios.post(`${this.BASE_URL}/add`, faculty);
      return { FacultyId: res.data.FacultyId };
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  async updateFaculty(faculty) {
    try {
      await axios.put(`${this.BASE_URL}`, faculty);
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }

  async deleteFaculty(id) {
    try {
      await axios.delete(`${this.BASE_URL}/${id}`);
    } catch (error) {
      console.log(error.toJSON());
      return { ErrorMsg: error.response.data };
    }
  }
}

const facultyService = new FacultyService();

export default facultyService;