import React, { useEffect } from 'react';
import polygon1 from '../assets/polygon-1.svg';
import image1 from '../assets/chai-1.png';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import chaipre from '../assets/chai-pre.png';
import chaipost from '../assets/chai-post.png';
import Brew from '../assets/brew.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const LandingSearch = () => {
    const profiles = [
        { name: 'Natacha' },
        { name: 'Raphael' },
        { name: 'Sebastien' },
        { name: 'Jan' },
        { name: 'Olivier' },
    ];

    const defaultBio = "Senior Software Engineer at Google\n\
            7+ years of experience in backend development and cloud infrastructure.\n\
            Holds a Master's in Computer Science from Stanford University.\n\
            Recently gave a keynote at PyCon on best practices for building resilient cloud applications.";

    const [bio, setBio] = useState(defaultBio);

    const handleBlur = () => {
        setBio(defaultBio);
    };

    const [common, setCommon] = useState("Python, Cloud Computing, Backend Development, Java, C++, Algorithms");
          
  return (
    <div className="flex justify-center w-full">
      {/* Main Content */}
      <main className="absolute top-[100px] left-0 w-full px-10">
  <h1 className="text-center text-[#522f02] text-8xl font-bold">
    JANE DOE
  </h1>

  <div className="flex mt-10 space-x-10">
    {/* Profile Image */}
    <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={image1}
        alt="Jane Doe"
      />
    </div>

    {/* Bio Section */}
    <section className="flex-1 bg-[#fffaef] p-6 rounded-lg border">
        <TextareaAutosize minRows={3} maxRows={7} className="w-full text-[22px] text-black bg-transparent" placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        />
        <Box className="mt-4 flex justify-end space-x-4">
            <Button className="mt-4" variant="contained" color="inherit">
                Save
            </Button>
            <Button className="mt-4" variant="contained" color="inherit"
            onClick={handleBlur}>
                Undo
            </Button>
        </Box>
    </section>

    {/* Common Interests */}
    <aside className="w-[378px] bg-[#967443] p-6 rounded-lg">
      <h2 className="text-center text-[25px] text-black font-bold">
        Common Interests
      </h2>
      <p className="text-[22px] text-black mt-4 space-y-1">
        {common}
        </p>
        </aside>
        </div>

        {/* Call to Action */}
        <div className="mt-10 flex space-x-10">
        <div className="w-[310px] h-[101px] bg-[#fffaf0] rounded-lg border">
            Add Jane to your Network!
        </div>

        {/* Chat Section */}
        <div className="flex-1 bg-[#967443] p-6 rounded-lg">
            <div className="flex items-center space-x-4">
            <img
                className="h-[200px] absolute left-80 bottom-0"
                src={chaipre}
                alt="Chat Icon"
            />
            {/* <section className="absolute top-[199px] left-1/2 transform -translate-x-1/3 w-[600px] flex justify-center"> */}
            <div className="bg-white rounded-[100px] p-2 px-5 text-center text-[#522f02] text-[20px] font-normal color-[#533003]">
                <p>
                Add more context or hit brew for convo starters!
                </p>
            {/* </section> */}
            </div>
            </div>
            <div className="mt-4 ml-3 bg-[#fffaef] p-1 rounded-xl border-2 border-[#522f02]">
            <TextField className="w-full"
            sx={{
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                },
                width: 920,
            }}
            placeholder='Brew a conversation starter...'
            />
            <Popup trigger={
                <IconButton>
                <img
                className="w-[50px] h-[50px]"
                alt="Brew Icon"
                src={Brew}
                />
            </IconButton>
                } 
                modal
                >
                {close => (
                <div className="popup-content bg-[#967443] p-6 rounded-lg h-2/3 w-4/5">
                    <div className="flex-1 bg-[#967443] p-6 rounded-lg h-full w-full">
                        <div className="flex items-center space-x-4">
                            <img
                                className="h-[200px] absolute left-80 bottom-0"
                                src={chaipost}
                                alt="Chat Icon"
                            />
                            {/* <section className="absolute top-[199px] left-1/2 transform -translate-x-1/3 w-[600px] flex justify-center"> */}
                            <div className="bg-white rounded-[100px] p-2 px-5 text-center text-[#522f02] text-[20px] font-normal color-[#533003]">
                                <p>
                                Add more context or hit brew for convo starters!
                                </p>
                            {/* </section> */}
                            </div>
                        </div>
                        <div className="mt-4 ml-3 bg-[#fffaef] p-1 rounded-xl border-2 border-[#522f02]">
                            <TextField className="w-full"
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                width: 920,
                            }}
                            placeholder='Brew a conversation starter...'
                            />
                        </div>
                    </div>
                </div>
                )}
            </Popup>
            
            </div>
        </div>
        </div>
        </main>
        
    </div>
  );
};

export default LandingSearch;