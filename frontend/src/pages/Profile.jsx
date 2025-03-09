import React from 'react';
import image1 from '../assets/chai-1.png';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

function Profile() {
  const defaultBio = "Senior Software Engineer at Google\n\
              7+ years of experience in backend development and cloud infrastructure.\n\
              Holds a Master's in Computer Science from Stanford University.\n\
              Recently gave a keynote at PyCon on best practices for building resilient cloud applications.";
  
      const [bio, setBio] = useState(defaultBio);
  
      const handleBlur = () => {
          setBio(defaultBio);
      };
  
  return (
    <div className="flex justify-center w-full">
    {/* Main Content */}
    <main className="absolute top-[100px] left-0 w-full px-10">
      <h1 className="text-center text-[#522f02] text-8xl font-bold">
        Jane Doe
      </h1>
      <div className="flex mt-10 space-x-24">
        {/* Profile Image */}
        <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={image1}
            alt="Jane Doe"
          />
        </div>

      {/* Bio Section */}
      <div className="w-[900px]">
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
        </div>
      </div>
    </main>
    </div>
  );
}

export default Profile;