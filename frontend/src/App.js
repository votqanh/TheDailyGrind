import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the root endpoint
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching root endpoint:", error));

    // Fetch data from the /generate endpoint
    fetch("http://127.0.0.1:5000/generate")
      .then((response) => response.json())
      .then((data) => setGeneratedContent(data.response))
      .catch((error) => console.error("Error fetching /generate endpoint:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">{message}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Generated Content:</h2>
        <p className="text-gray-600">{generatedContent}</p>
      </div>
    </div>
  );
}

export default App;
