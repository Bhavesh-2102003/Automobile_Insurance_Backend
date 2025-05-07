// store/action/fetchOfficerProfile.js
import axios from "axios";
import { setOfficerProfile } from "./officerProfileSlice";

  

//reducers only respond to actions. And the only way to send an action to a reducer is via dispatch().
const fetchOfficerProfile = () => async (dispatch) => {
  try {
    const UserId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');
    if (!UserId || UserId === "null") {
      console.log("No UserId in localStorage, skipping officer profile fetch.");
      return;
    }
    const response = await axios.get(`http://localhost:8087/api/officer/getByuser/${UserId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(setOfficerProfile({ officer: response.data }));
  } catch (error) {
    console.error("Error fetching officer profile:", error);
  }
};

export default fetchOfficerProfile;