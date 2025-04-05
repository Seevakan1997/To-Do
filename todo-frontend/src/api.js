import axios from "axios";

const API_URL = "http://localhost:8000/api/";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}tasks`, task);
    console.log("Task created response:", response);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const completeTask = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error completing task:", error);
    throw error;
  }
};
