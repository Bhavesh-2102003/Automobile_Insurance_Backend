import axios from "axios";
import { setCustomerCount } from "../customerStatsSlice";

// Async action to fetch customer count from backend
const fetchCustomerCount = () => async (dispatch) => {
    const resp = await axios.get("http://localhost:8087/api/customer/count");
    dispatch(setCustomerCount(resp.data.count));
};

export default fetchCustomerCount;