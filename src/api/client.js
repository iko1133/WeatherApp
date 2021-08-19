import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

export default apiClient;
