import React, { useEffect } from 'react';
import image1 from '../assets/chai-1.png';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import chaipre from '../assets/chai-pre.png';
import chaipost from '../assets/chai-post.png';
import Brew from '../assets/brew.png';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../style.css';
import ProfileNetwork from './ProfileNetwork';

const LandingSearch = () => {
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
    <div className="flex flex-row w-full">

    <div className="flex flex-col items-center ml-10 space-y-10">
        {/* Profile Image */}
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden mt-14 border-4 border-[#522f02]">
        <img
            className="w-full h-full object-cover"
            src={image1}
            alt="Jane Doe"
        />
        </div>

        {/* Call to Action */}

        <div className="w-[310px] h-[350px] bg-[#fffaf0] p-2 rounded-2xl border-2 border-[#522f02]">
            <ProfileNetwork />
        </div>
    </div>

      {/* Main Content */}
      <main className="stick right-0 w-full px-10 mt-10 ml-4">
        <h1 className="text-center text-[#522f02] text-[60px] font-bold">
            Jane Doe
        </h1>

  <div className="flex mt-7 space-x-10 text-[#533003]">

    {/* Bio Section */}
    <section className="flex-1 bg-[#967443] p-6 rounded-2xl border">
        <h2 className="text-center text-[25px] font-bold bg-[#fffaef] rounded-2xl px-4 py-2">
        A Sip of Their Journey
        </h2>
        <TextareaAutosize minRows={3} maxRows={7} className="w-full text-[20px] bg-[#fffaef]
        rounded-2xl 
        px-4 py-2
        mt-4
        "
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        />
        <Box className="mt-2 flex justify-end space-x-4">
            <Button variant="contained" color="inherit">
                Save
            </Button>
            <Button variant="contained" color="inherit"
            onClick={handleBlur}>
                Undo
            </Button>
        </Box>
    </section>

    {/* Common Interests */}
    <div className="flex flex-col w-[378px] bg-[#967443] p-6 rounded-2xl">
    <h2 className="text-center text-[25px] font-bold bg-[#fffaef] rounded-2xl px-4 py-2">
        Shared Grounds
      </h2>
      <div className="text-[20px] mt-4 space-y-1 bg-[#fffaef] h-full
      rounded-2xl 
        px-4 py-2
        mt-4">
        {common}
        </div>
        </div>
        </div>
        {/* Chat Section */}
        <div className="flex-1 mt-10 bg-[#967443] p-6 rounded-2xl">
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
            <Popup 
                trigger={
                <IconButton>
                <img
                    className="w-[50px] h-[50px]"
                    alt="Brew Icon"
                    src={Brew}
                    />
                </IconButton>
                }
                contentStyle={{ width: 'fit-content', padding: '0', border: 'none', maxWidth: '75vw', maxHeight: '80vh', backgroundColor: '#fffaef'}}
                overlayStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                modal
                >
                {close => (
                <div className="popup-content">
                    <div className="bg-[#967443] p-6 rounded-lg h-[600px] flex-col">
                        <div className="flex items-center space-x-4 h-[450px]">
                            <img
                                className="h-[200px] absolute left-10 bottom-1"
                                src={chaipost}
                                alt="Chat Icon"
                            />
                            <div className="bg-white rounded-[100px] p-2 px-5 text-center text-[#522f02] text-[20px] font-normal color-[#533003]">
                                <p>
                                Placeholder response from Gemini
                                </p>
                            {/* </section> */}
                            </div>
                        </div>
                        <div className="w-[850px] mx-[200px] bg-[#fffaef] p-1 rounded-xl border-2 border-[#522f02]">
                            <TextField className="w-full"
                            sx={{
                                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                width: 750,
                            }}
                            placeholder='Stir up some more conversation ...'
                            />
                            <IconButton>
                                <img
                                    className="w-[50px] h-[50px]"
                                    alt="Brew Icon"
                                    src={Brew}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
                )}
            </Popup>
            
            </div>
        </div>
        </main>
        
    </div>
  );
};

export default LandingSearch;