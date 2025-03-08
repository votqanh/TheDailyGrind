import React from 'react';
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

const profiles = [
    { name: 'Natacha' },
    { name: 'Raphael' },
    { name: 'Sebastien' },
    { name: 'Jan' },
    { name: 'Olivier' },
  ];

const LandingSearch = () => {
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