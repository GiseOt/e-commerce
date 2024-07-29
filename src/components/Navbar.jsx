import * as React from "react";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Button,
	MenuItem,
	CssBaseline,
} from "@mui/material";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const pages = ["Home", "Categories", "User"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<CssBaseline /> 
			<AppBar sx={{ paddingInline: 5, bgcolor: "white", boxShadow: 3 }}>
				<Toolbar disableGutters sx={{ width: "100%", maxWidth: "100vw" }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleOpenNavMenu}
						sx={{ display: { xs: "block", md: "none" }, color: "gray" }}
					>
						<FaBars size={24} />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="#app-bar-with-responsive-menu"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "gray",
							textDecoration: "none",
						}}
					>
						ARTESIA
					</Typography>
					<Box sx={{ flexGrow: 1, textAlign: "center" }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{
									mx: 2,
									color: "gray",
									position: "relative",
									"&::after": {
										content: '""',
										position: "absolute",
										width: "0",
										height: "2px",
										bottom: "-2px",
										left: "50%",
										transform: "translateX(-50%)",
										backgroundColor: "#FFF200",
										transition: "width 0.3s",
									},
									"&:hover::after": {
										width: "100%",
									},
								}}
							>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
						<IconButton
							onClick={handleOpenUserMenu}
							sx={{ p: 0, color: "gray" }}
						>
							<FaShoppingCart size={24} />
						</IconButton>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center" sx={{ color: "gray" }}>
										{setting}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
