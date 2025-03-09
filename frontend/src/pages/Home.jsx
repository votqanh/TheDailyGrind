import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@mui/material/styles/styled';
import { alpha } from '@mui/material/styles';
import LandingSearch from '../components/LandingSearch';
import chai from '../assets/chai-1.png';
import image from '../assets/image.svg';
import materialSymbolsLightNetworkNode from '../assets/material-symbols-light-network-node.svg';
import materialSymbolsLightNetworkNode2 from '../assets/material-symbols-light-network-node-2.svg';
import Checkbox from '@mui/material/Checkbox';
import OtherProfile from '../components/OtherProfile';
import Profile from './Profile';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();

    const [isProfile, setIsProfile] = React.useState(false);
    const [isMyProfile, setIsMyProfile] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    const [profiles, setProfiles] = useState([
      { fullName: 'Jeff Nguyen' },
      { fullName: 'Bob' },
      { fullName: 'Charlie' },
      { fullName: 'Diana' },
      { fullName: 'Eve' },
    ]);

    const [profileData, setProfileData] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState({
    "bio": {},
    "common": {}
  });

    const handleChange = (event) => {
        setIsProfile(event.target.checked);
      };

    
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      // find username of selected profile
      const username = profiles.find((profile) => profile.fullName === selectedProfile)?.username;

      try {
        const response = await fetch(`http://127.0.0.1:5000/generate-summary?username=${username}`); // Add query parameter
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfileData(data); // Update state with fetched profiles
        setIsProfile(true);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setError(error); // Set error state
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, [selectedProfile]);

    const openProfile = () => {
        // redirect to profile page
        // navigate('/profile');
        setIsProfile(false);
        setIsMyProfile(true);
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: '40ch',
          },
        },
      }));
      
        
  return (
    <div className="h-screen bg-[#f7e7c3] ">
    <AppBar position="static" 
    sx={{ backgroundColor: "#977444" }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box className="flex items-center space-x-4 mr-4">
        <img
                className="w-[50px] h-auto"
                alt="Logo"
                src={logo}
            />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          DAILY GRIND
        </Typography>
        </Box>
        {isProfile && (
        <Search>
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search a user..."
            inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        )}

        <Box sx={{ flexGrow: 0, ml: 'auto' }}>

            <Checkbox 
            checked={isProfile}
            onChange={handleChange}
            />
        
        <Button
            // variant="contained"
            sx={
                {
                color: "#533003",
                borderRadius: "24px",
                padding: "12px",
                fontSize: "1.25rem",
                height: "48px",
                }
            }
            startIcon={
                <div className="relative flex items-center">
                    <img
                    className="w-[50px] h-[50px] mb-4"
                    alt="Network Icon"
                    src={image}
                />
                {/* <img
                    className="w-[50x] h-[50px] ml-2"
                    alt="Node Icon"
                    src={materialSymbolsLightNetworkNode}
                /> */}
                {/* <img
                    className="w-[50px] h-[50px] absolute left-1 top-6"
                    alt="Node Icon 2"
                    src={materialSymbolsLightNetworkNode2}
                    /> */}
            </div>
            }
            >
              Network
            </Button>
          <Tooltip title="My profile">
          <Chip
            avatar={<Avatar alt="Natacha" src={chai}
                sx={{ width: 32, height: 32 }} 
                />}
            sx={{ fontSize: "1.25rem", padding: "12px", height: "48px", 
                borderRadius: "24px",
                backgroundColor: "#f7e7c3",
                border: "2px solid #533003",
            }}
            label="Ne Zha"
            onClick={openProfile}
            />
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            // anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            // open={Boolean(anchorElUser)}
            // onClose={handleCloseUserMenu}
          >
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>

    {isProfile ? <OtherProfile profileData={profileData}/> : (isMyProfile ? <Profile /> : <LandingSearch
    setSelectedProfile={setSelectedProfile} setProfiles={setProfiles}
    profiles={profiles}/>)}
    </div>
  );
}

export default Home;