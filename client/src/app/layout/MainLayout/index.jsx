import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import LogoutIcon from '@mui/icons-material/Logout';
import BackofficeButton from '../../components/Buttons/backofficeButton';
import { Link, Outlet } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		})
	})
);

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
export default function PersistentDrawerLeft ({ children }) {
	const theme = useTheme();
	const [open, setOpen] = useState(false);
	const role = localStorage.getItem('role');

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const deleteToken = () => {
		localStorage.clear();
	};

	return (

		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
            Workspace Management
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{[{ text: 'Home', route: '/' }, { text: 'Reservations', route: 'reservations' }].map(({ text, route }) => (
						<ListItem key={text} disablePadding>
							<Link to={route} style={{ color: '#202120' }}>
								<ListItemButton>
									<ListItemIcon>
										<InboxIcon />
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{[{ text: 'Logout', route: 'sign-in' }].map(({ text, route }) => (
						<ListItem key={text} disablePadding>
							<Link to={route} style={{ color: '#202120' }} onClick={deleteToken}>
								<ListItemButton>
									<ListItemIcon>
										<LogoutIcon />
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItemButton>
							</Link>
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{role?.length && role.includes('Administrator') && (
						<ListItem disablePadding>
							<Link to="/backoffice" style={{ color: '#202120' }} onClick={handleDrawerClose}>
								<ListItemButton>
									<ListItemIcon>
										<BackofficeButton text={'Backoffice'}/>
									</ListItemIcon>
								</ListItemButton>
							</Link>
						</ListItem>
					)}
				</List>

			</Drawer>
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</Box>
	);
}
