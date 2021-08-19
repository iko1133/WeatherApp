import apiClient from "./client";

export const getNextFiveDays = (locationName) =>
  apiClient.get(
    `forecast?q=${locationName}&appid=a408b1a5d143c57f794e55f2f26d9565&units=metric`
  );
