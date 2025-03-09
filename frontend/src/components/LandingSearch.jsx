import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, Avatar, Typography, IconButton } from '@mui/material';
import chai1 from '../assets/chai-1.png';
import { Autocomplete } from '@mui/material';
import image5 from '../assets/image-5.png';
import SearchIcon from '@mui/icons-material/Search';
import polygon1 from '../assets/polygon-1.svg';

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
      
        {/* Search Prompt */}
        <section className="absolute top-[199px] left-1/2 transform -translate-x-1/3 w-[600px] flex justify-center">
          <div className="bg-white rounded-[100px] p-6 text-center text-[#522f02] text-[40px] font-normal">
            Search for a contact below and start a conversation!
          </div>
          <img
              className="absolute w-[78px] h-[62px] left-0 bottom-4"
              alt="Speech Tail"
              src={polygon1}
          />
        </section>

        {/* Search Bar */}
        <section className="absolute top-[458px] left-2/3 transform -translate-x-1/2 w-[660px] bg-white rounded-[50px] flex items-center px-4
        border-2 border-[#522f02]">
        <IconButton>
            <SearchIcon 
            sx={
                {
                    color: "#522f02",
                    fontSize: "40px",
            }} />
        </IconButton>
            <Autocomplete
                sx={{
                    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    width: 700,
                }}
                id="free-solo-demo"
                freeSolo
                options={profiles.map((option) => option.name)}
                renderInput={(params) => <TextField 
                    sx={{
                        "& .MuiInputBase-input": {
                            fontSize: "24px",
                            fontWeight: 500,
                            color: "#522f02",
                        },
                    }}
                    {...params} />}
            />    
        </section>

        {/* Character Image */}
        <div className="absolute bottom-0 left-20">
          <img className="w-[522px] h-[609px]" alt="Character" src={image5} />
        </div>
      </main>
    </div>
  );
};

export default LandingSearch;