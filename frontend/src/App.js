import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile';
import Home from './pages/Home';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
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
      </Routes>
    </Router>
  );
}

export default App;
