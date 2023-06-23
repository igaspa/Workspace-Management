import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Logout, FactCheck, Login } from '@mui/icons-material';
import BackofficeButton from '../../components/Buttons/backofficeButton';
import { Link, Outlet } from 'react-router-dom';
import { ROLES } from '../../utils/constants';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const jwt = localStorage.getItem('token');

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

// eslint-disable-next-line react/prop-types
export default function PersistentDrawerLeft({ window }) {
  const [open, setOpen] = useState(false);
  const role = localStorage.getItem('role');
  const isAdministrator = role?.length && role.includes(ROLES.ADMINISTRATOR);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const deleteToken = () => {
    localStorage.clear();
  };

  const hasAccess = (allowedRoles) => {
    return role && allowedRoles.some((allowedRole) => role.includes(allowedRole));
  };

  const routes = [
    { text: 'Home', route: '/', icon: Home, roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.LEAD, ROLES.TABLET] },
    {
      text: 'Reservations',
      route: 'reservations',
      icon: FactCheck,
      roles: [ROLES.ADMINISTRATOR, ROLES.EMPLOYEE, ROLES.LEAD]
    }
  ];

  const drawer = (
    <div>
      {jwt ? (
        <>
          <Divider />
          <List>
            {routes.map(
              ({ text, route, icon, roles }) =>
                hasAccess(roles) && (
                  <ListItem key={text} disablePadding>
                    <Link to={route} style={{ color: '#202120' }}>
                      <ListItemButton>
                        <ListItemIcon>
                          <SvgIcon component={icon} inheritViewBox />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                )
            )}
          </List>

          <Divider />
          <List>
            {[{ text: 'Logout', route: 'sign-in' }].map(({ text, route }) => (
              <ListItem key={text} disablePadding>
                <Link to={route} style={{ color: '#202120' }} onClick={deleteToken}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {isAdministrator && (
              <ListItem disablePadding>
                <Link to="/backoffice" style={{ color: '#202120' }} onClick={handleDrawerToggle}>
                  <BackofficeButton text={'Backoffice'} />
                </Link>
              </ListItem>
            )}
          </List>
        </>
      ) : (
        <>
          <List>
            {[{ text: 'Sign In', route: 'sign-in' }].map(({ text, route }) => (
              <ListItem key={text} disablePadding>
                <Link to={route} style={{ color: '#202120' }} onClick={deleteToken}>
                  <ListItemButton>
                    <ListItemIcon>
                      <Login />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
        </>
      )}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Workspace Management
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}

PersistentDrawerLeft.propTypes = {
  window: PropTypes.func
};
