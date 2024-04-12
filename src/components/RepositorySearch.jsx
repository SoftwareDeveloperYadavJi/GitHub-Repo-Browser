import React, { useState } from 'react';
import { searchRepositories, getRepositoryDetails } from './api';

const RepositorySearch = () => {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSearch = async () => {
    try {
      setSearching(true);
      const results = await searchRepositories(query);
      setRepositories(results);
      setSearching(false);
      setSelectedRepo(null); // Reset selected repository when performing a new search
    } catch (error) {
      setError(error);
      setSearching(false);
      setSelectedRepo(null);
    }
  };

  const handleRepoClick = async (repo) => {
    try {
      const details = await getRepositoryDetails(repo.owner.login, repo.name);
      setSelectedRepo(details);
    } catch (error) {
      setError(error);
    }
  };

  const closeModal = () => {
    setSelectedRepo(null); // Reset selected repository when closing the modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">GitHub Repository Viewer</h1>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="mt-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          disabled={searching || query.trim() === ''}
        >
          {searching ? 'Searching...' : 'Search'}
        </button>

        {error && <div className="text-red-500 mt-4">{error.message}</div>}

        <ul className="mt-4">
          {repositories.map((repo) => (
            <li
              key={repo.id}
              className="py-2 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRepoClick(repo)}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                onClick={(e) => e.preventDefault()} // Prevent default link behavior
              >
                {repo.full_name}
              </a>
              <p className="text-sm text-gray-500">{repo.description}</p>
              <div className="mt-1 flex items-center">
                <span className="mr-2">{repo.stargazers_count} Stars</span>
                <span className="mr-2">{repo.forks_count} Forks</span>
                <span className="mr-2">{repo.open_issues_count} Issues</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Modal to display selected repository details */}
        {selectedRepo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white max-w-lg p-4 rounded-lg shadow-lg">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedRepo.full_name}</h2>
              <p className="text-sm text-gray-600">{selectedRepo.description}</p>
              <p className="mt-2">
                <strong>Stars:</strong> {selectedRepo.stargazers_count}
              </p>
              <p>
                <strong>Forks:</strong> {selectedRepo.forks_count}
              </p>
              <p>
                <strong>Open Issues:</strong> {selectedRepo.open_issues_count}
              </p>
              <p>
                <strong>Created At:</strong> {new Date(selectedRepo.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Owner:</strong> {selectedRepo.owner.login}
              </p>
              {/* Link to view repository on GitHub */}
              <a
                href={selectedRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                View on GitHub
              </a>
              {/* Cancel button to close the modal */}
              <button
                className="mt-4  ml-2 inline-block px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RepositorySearch;
