import React, { useState, useEffect } from "react";
import api from "../config/api";

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState("Testing...");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      console.log("Testing API connection...");
      console.log("API Base URL:", api.defaults.baseURL);

      setApiStatus("Testing API connection...");

      // Test basic API endpoint
      const response = await api.get("/api");
      console.log("API Test Response:", response);
      setApiData(response.data);
      setApiStatus("API Connection Successful!");
    } catch (err) {
      console.error("API Test Error:", err);
      setError(err.message);
      setApiStatus("API Connection Failed");
    }
  };

  const testPropertiesEndpoint = async () => {
    try {
      setApiStatus("Testing properties endpoint...");
      const response = await api.get("/api/properties");
      console.log("Properties Response:", response);
      setApiData(response.data);
      setApiStatus("Properties endpoint working!");
    } catch (err) {
      console.error("Properties Test Error:", err);
      setError(err.message);
      setApiStatus("Properties endpoint failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          API Connection Test
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p
            className={`text-lg ${
              apiStatus.includes("Successful")
                ? "text-green-600"
                : apiStatus.includes("Failed")
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {apiStatus}
          </p>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-semibold text-red-800">Error Details:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="space-y-2">
            <p>
              <strong>Base URL:</strong> {api.defaults.baseURL}
            </p>
            <p>
              <strong>Environment:</strong> {process.env.NODE_ENV}
            </p>
            <p>
              <strong>REACT_APP_API_URL:</strong>{" "}
              {process.env.REACT_APP_API_URL || "Not set"}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-x-4">
            <button
              onClick={testApiConnection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Basic API
            </button>
            <button
              onClick={testPropertiesEndpoint}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Test Properties Endpoint
            </button>
          </div>
        </div>

        {apiData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">API Response Data</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
