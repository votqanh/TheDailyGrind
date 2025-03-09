import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, Avatar, Typography } from '@mui/material';
import chai1 from '../assets/chai-1.png';
import { Autocomplete } from '@mui/material';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
}));

const LandingSearch = () => {
  const [profiles, setProfiles] = useState({ data: { items: [] } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // Function to fetch profiles based on search query
  const fetchProfiles = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/linkedin-search?query=${query}'); // Add query parameter
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProfiles(data); // Update state with fetched profiles
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setError(error); // Set error state
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchProfiles(inputValue); // Fetch profiles when Enter is pressed
    }
  };

  return (
    <div className="flex justify-center w-full">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center h-full">
        <div className="absolute bottom-1/3 left-1/3">
          {/* Speech Bubble */}
          <div className="relative bg-white rounded-[50px] px-6 py-4 w-[720px] text-center shadow-md mt-[150px]">
            <p className="text-[#522f02] text-[32px] font-normal">
              Search for a contact below and start a conversation!
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative bg-white rounded-[50px] w-[660px] h-[80px] flex items-center mt-6 px-4 shadow-md">
            <Autocomplete
              sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                width: 700,
              }}
              id="free-solo-demo"
              freeSolo
              options={profiles.data.items.map((option) => option.fullName)} // Use fullName from profiles
              onInputChange={(event, newValue) => setInputValue(newValue)} // Update input value
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "24px",
                      fontWeight: 500,
                      color: "#522f02",
                    },
                  }}
                  onKeyDown={handleKeyDown} // Add keydown event handler
                  placeholder="Search for a profile..."
                />
              )}
            />
          </div>
        </div>
        {/* Character Image */}
        <div className="absolute bottom-5 left-40">
          <img className="w-[389px] h-[477px]" alt="Chai" src={chai1} />
        </div>
      </main>
    </div>
  );
};

export default LandingSearch;