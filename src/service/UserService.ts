import axios from "axios";
import { UserDto } from "../dtos/Dto";

const USER_API_BASE_URL = "http://localhost:8080/api/board/user";

class UserService {
  createUser(user: UserDto) {
    return axios.post(USER_API_BASE_URL + "/signUp", user);
  }

  signIn(user: UserDto) {
    return axios.post(USER_API_BASE_URL + "/signIn", user);
  }
}

export default new UserService();
