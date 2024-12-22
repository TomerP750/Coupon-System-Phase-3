import "./Header.css";
import * as React from 'react';
import {useEffect, useState} from 'react'; // Import NavLink
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {NavLink, useNavigate} from 'react-router-dom';
import authService from "../../AuthArea/AuthService";
import {authStore, JWTUser, logout} from "../../AuthArea/AuthStore";
import {ClientType} from "../../../Services/ClientType";

const customerPages = ['About', 'Coupons'];
const companyPages = ['About'];
const adminPages = ['About'];
const guestPages = ['About', 'Login'];
const settings = ['Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const navigate = useNavigate();

    const [user, setUser] = useState<JWTUser|null>(null);
    useEffect(() => {
        setUser(authStore.getState().user);

        authStore.subscribe(()=>{
            setUser(authStore.getState().user);
        })
    }, []);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = ()=>{
        authService.logOut().then(()=>{
            authStore.dispatch(logout());
            navigate("/login")
        })
    }

    return (
        <AppBar position="static" sx={{backgroundColor:'#388E3C'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontStyle:'italic',
                            fontSize:'2rem'
                        }}
                    >
                        Coupo<span id={"n"}>N</span>est
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >

                            {user?.clientType.toString()==="ADMINISTRATOR"? adminPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <NavLink to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </NavLink>
                                </MenuItem>
                            )): user?.clientType.toString()==="COMPANY"? companyPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <NavLink to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </NavLink>
                                </MenuItem>
                            )): user?.clientType.toString()==="CUSTOMER"? customerPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <NavLink to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                                    </NavLink>
                                </MenuItem>
                            )):guestPages.map((page) => (
                                <NavLink key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none'}}>
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        </NavLink>
                        ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CoupoNest
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {user?.clientType.toString()==='ADMINISTRATOR'? adminPages.map((page) => (
                            <NavLink key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        )): user?.clientType.toString()==="COMPANY"? companyPages.map((page) => (
                            <NavLink key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        )): user?.clientType.toString()==="CUSTOMER" ? customerPages.map((page) => (
                            <NavLink key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        )):guestPages.map((page) => ( // if page.tolowercase == login style flex end
                            <NavLink key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    {user && (
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {user?.clientType.toString() === "CUSTOMER"? settings.map((setting) => (
                                <MenuItem key={setting} onClick={setting === "Logout"? handleLogout :setting==="Dashboard"? ()=>navigate("/customer/Dashboard"):handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            )) : user?.clientType.toString()=== "COMPANY"? settings.map((setting) => (
                                <MenuItem key={setting} onClick={setting === "Logout"? handleLogout :setting==="Dashboard"? ()=>navigate("/company/Dashboard"):handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            )) :  settings.map((setting) => (
                                <MenuItem key={setting} onClick={setting === "Logout"? handleLogout :setting==="Dashboard"? ()=>navigate("/admin/Dashboard"): handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                        )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;

