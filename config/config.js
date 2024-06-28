// config/config.js

export const API_URL = 'https://forkify-api.herokuapp.com/api';

export async function getJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status === "success") {
      return data;
    } else if (data.status === "fail") {
      throw new Error(data.message || "Request failed.");
    }
  } catch (error) {
    throw new Error(error.message || "An error occurred while fetching the data.");
  }
}
