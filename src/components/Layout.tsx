import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';

// import { AuthContext } from '../../providers/AuthProvider';

import { UserDropdown } from './UserDropdown';

const drawerWidth = 240;

export function Layout({ window, children }) {

    // const { auth } = useContext(AuthContext);

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [mobileOpen, setMobileOpen] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const navItems = [
        { label: 'Eventos', pathname: '/', action: () => navigate('/') },
        { label: 'Participantes', pathname: '/participants', action: () => navigate('/participants') }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding onClick={() => item.action()}>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label.toUpperCase()} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box>
            <CssBaseline />
            <AppBar position="fixed" sx={{ alignItems: 'center', background: 'linear-gradient(to right, #88D9FC, #1DFDF4)' }}>
                <Toolbar sx={{ width: '100%', maxWidth: '2000px', display: 'flex', justifyContent: 'space-between', px: 2 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, color: '#FFF', display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                sx={{
                                    backgroundColor: pathname === item.pathname ? '#fff' : '#F0B7FA',
                                    color: pathname === item.pathname ? '#F0B7FA' : '#fff',
                                    mr: 1,
                                    ml: 1,
                                    ':hover': {
                                        backgroundColor: '#fff',
                                        color: '#F0B7FA'
                                    }
                                }}
                                onClick={() => item.action()}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                        <Avatar
                            sx={{ cursor: 'pointer', backgroundColor: '#FFF', color: '#F0B7FA' }}
                            onMouseEnter={() => setShowUserDropdown(true)}
                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                        >
                            {/* {auth?.me.username.charAt(0).toUpperCase()} */}
                            T
                        </Avatar>
                        {showUserDropdown && <UserDropdown setShowUserDropdown={setShowUserDropdown} />}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box sx={{ p: 3, pt: 10 }}>
                {children}
            </Box>
        </Box>
    );
}