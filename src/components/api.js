import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

// Function to search repositories by query
export const searchRepositories = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/repositories?q=${query}`);
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// Function to get repository details by owner and repo name
export const getRepositoryDetails = async (owner, repoName) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/repos/${owner}/${repoName}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


