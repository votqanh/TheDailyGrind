import React, { useState, useEffect } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@mui/material/styles/styled';
import { alpha } from '@mui/material/styles';
import LandingSearch from '../components/LandingSearch';

function Home() {
    const navigate = useNavigate();
    const pages = ['Network'];

    const [isProfile, setIsProfile] = React.useState(false);

    const openProfile = () => {
        // redirect to profile page
        navigate('/profile');
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
            width: '15ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
      
        
  return (
    <div className="h-screen bg-[#f7e7c3] ">
    <AppBar position="static" 
    sx={{ backgroundColor: "#977444" }}>
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
          LOGO
        </Typography>
        {/* {isProfile && ( */}
        <Search>
            <SearchIconWrapper>
            <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search a profile…"
            inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        {/* )} */}
        
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
            //   onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
          ))}
        </Box>
        
        
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="My profile">
          <Chip
            avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" 
                sx={{ width: 24, height: 24 }}/>}
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

    {!isProfile && <LandingSearch/>}
    </div>
  );
}

export default Home;