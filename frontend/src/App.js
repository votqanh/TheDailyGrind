import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the root endpoint
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching root endpoint:", error));

    // Fetch data from the /generate endpoint
  //   fetch("http://127.0.0.1:5000/generate-summary")
  //     .then((response) => response.json())
  //     .then((data) => setGeneratedContent(data.response))
  //     .catch((error) => console.error("Error fetching /generate-summary endpoint:", error));

  //   // Fetch data from the /linkedin-posts endpoint
  //   fetch("http://127.0.0.1:5000/linkedin-posts")
  //     .then((response) => response.json())
  //     .then((data) => setGeneratedContent(data.response))
  //     .catch((error) => console.error("Error fetching /linkedin-posts endpoint:", error));
  }, []);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600">{message}</h1>
          </div>
        } /> */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
