import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { use, useState } from "react";
import login1 from "../assets/login1.png";
import login2 from "../assets/login2.png";
import polygon1 from '../assets/login-polygon.png';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [isEntering, setIsEntering] = useState(false);
    const navigate = useNavigate();
    
    //if focused change login photo
    const handleFocus = () => {
        setIsEntering(true);
    };

    const handleBlur = () => {
        setIsEntering(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }

  return (
    <div className="bg-[#f7e7c3] flex flex-col items-center h-screen">
      <header className="bg-[#967443] w-full py-6 text-center sticky top-0 z-10">
        <h1 className="text-white text-[70px] font-bold tracking-wide">
          THE DAILY GRIND
        </h1>
      </header>

        <div className="flex items-center justify-center mt-10">
        <main className="flex flex-col items-center mt-20">
            <div className="relative bg-[#fffaef] rounded-[50px] px-8 py-4 flex items-center">
                <img
                    className="absolute w-[70px] h-[55px] left-[265px] bottom-0"
                    alt="Speech Tail"
                    src={polygon1}
                />
                <p className="text-[#522f02] text-[40px] font-bold">Login Please!</p>
            </div>
            <div className="absolute right-[-20px] bottom-[-10px] w-6 h-6 bg-[#fffaef] border-[5px] border-[#522f02] rotate-45"></div>

            <form className="mt-6 flex flex-col gap-4 w-[400px] items-center"
                onSubmit={handleSubmit}
            >
            <TextField
                fullWidth
                className="bg-[#fffaef] rounded-[30px] px-4"
                variant="standard"
                slotProps={{
                    input: {
                        disableUnderline: true,
                    },
                }}
                sx={{
                    "& .MuiInputBase-input": {
                        fontSize: "20px",
                        color: "#522f02",
                        paddingX: "20px",
                        paddingY: "12px",
                    },
                }}
                placeholder="Username"
            />
            <TextField
                type="password"
                onFocus={handleFocus}
                onBlur={handleBlur}
                fullWidth
                className="bg-[#fffaef] rounded-[50px] px-4"
                variant="standard"
                slotProps={{
                    input: {
                        disableUnderline: true,
                    },
                }}
                sx={{
                    "& .MuiInputBase-input": {
                        fontSize: "20px",
                        color: "#522f02",
                        paddingX: "20px",
                        paddingY: "12px",
                    },
                }}
                placeholder="Password"
            />
            <Button
                type="submit"
                variant="contained"
                className="py-3 w-[200px]"
                sx={{
                    backgroundColor: '#96F586',
                    color: '#533003',
                    borderRadius: '50px',
                    fontWeight: 700,
                    '&:hover': {
                      backgroundColor: '#69AC5E',
                    },
                    marginTop: '20px',
                  }}
            >
                Login
            </Button>
            </form>
        </main>

        <aside className="ml-20 mt-20 w-[200px]">
            <img
                src={isEntering? login2 : login1}
                alt="Parrot holding coffee"
                className="h-[350px] w-auto"
            />
            </aside>
        </div>
    </div>
  );
};

export default Login;