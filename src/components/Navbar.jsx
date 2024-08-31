import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserDrawer from "./UserDrawer";
import { FirestoreContext } from "../contex/FireStoreContext";
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Button,
	CssBaseline,
	Badge,
	TextField,
} from "@mui/material";
import { FaShoppingCart, FaBars, FaUserAlt } from "react-icons/fa";

const Navbar = ({ handleChangeFilter }) => {
	const { cart } = useContext(FirestoreContext);

	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [userDrawerOpen, setUserDrawerOpen] = useState(false);
	const dropdownRef = useRef(null);
	const [menuOpen, setMenuOpen] = useState(false);

	//Mobile Menu
	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

    //Cart
	const handleCartClick = () => {
		navigate("/yourcart");
	};

	const toggleDropdown = () => {
		setDropdownOpen(!dropdownOpen);
	};

	const handleLinkClick = (value) => {
		handleChangeFilter("category", value);
		setDropdownOpen(false);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDropdownOpen(false);
		}
	};
    //User
	const toggleUserDrawer = () => {
		setUserDrawerOpen(!userDrawerOpen);
	};
    //Search
	const handleNameChange = (event) => {
		handleChangeFilter("name", event.target.value);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<CssBaseline />
			<AppBar
				sx={{
					paddingInline: { xs: "10px", md: 5 }, 
					bgcolor: "white",
					boxShadow: 3,
				}}
			>
				<Toolbar disableGutters sx={{ width: "100%", maxWidth: "100vw" , paddingBottom : "5px"}}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ display: { xs: "block", md: "none" }, color: "gray" }}
						onClick={toggleMenu}
					>
						<FaBars size={24} />
					</IconButton>
					{menuOpen && (
						<Box
							sx={{
								display: { xs: "block", md: "none" },
								position: "absolute",
								top: "75px",
								right: 0,
								width: "100%",
								bgcolor: "white",
								boxShadow: 3,
								borderRadius: 1,
								zIndex: 1,
							}}
						>
							<Button
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
								onClick={() => {
									setMenuOpen(false);
								}}
							>
								<Link
									to="/"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									Home
								</Link>
							</Button>

							<Button
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
								onClick={toggleDropdown}
							>
								Categories
							</Button>
						</Box>
					)}

					<Typography
						variant="h6"
						noWrap
						sx={{
							mr: 2,
							fontSize: { xs: "15px", md:"20px" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "gray",
							textDecoration: "none",
						}}
					>
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							ARTESIA
						</Link>
					</Typography>

					{/* Desktop menu items */}
					<Box
						sx={{
							flexGrow: 1,
							textAlign: "center",
							position: "relative",
							display: { md: "flex" },
							justifyContent: { md: "center" },
						}}
					>
						<Button
							sx={{
								display: { xs: "none", md: "block" },
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
							<Link
								to="/"
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
								Home
							</Link>
						</Button>

						<Button
							sx={{
								display: { xs: "none", md: "block" },
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
							onClick={toggleDropdown}
						>
							Categories
						</Button>
						{dropdownOpen && (
							<Box
								ref={dropdownRef}
								sx={{
									position: "absolute",
									top: "100%",
									left: "50%",
									width: "200px",
									bgcolor: "white",
									boxShadow: 3,
									borderRadius: 1,
									zIndex: 1,
								}}
							>
								<Link
									to="/"
									onClick={() => handleLinkClick("")}
									style={{
										display: "block",
										padding: "8px 16px",
										textDecoration: "none",
										color: "gray",
									}}
								>
									All
								</Link>
								<Link
									to="/categories/candles"
									onClick={() => handleLinkClick("candles")}
									style={{
										display: "block",
										padding: "8px 16px",
										textDecoration: "none",
										color: "gray",
									}}
								>
									Candles
								</Link>
								<Link
									to="/categories/vases"
									onClick={() => handleLinkClick("vases")}
									style={{
										display: "block",
										padding: "8px 16px",
										textDecoration: "none",
										color: "gray",
									}}
								>
									Vases
								</Link>
								<Link
									to="/categories/art"
									onClick={() => handleLinkClick("art")}
									style={{
										display: "block",
										padding: "8px 16px",
										textDecoration: "none",
										color: "gray",
									}}
								>
									Art
								</Link>
							</Box>
						)}
					</Box>

					{/* Search  */}
					<Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
						<TextField
							id="filled-basic"
							label="Search"
							variant="filled"
							color="primary"
							focused
							onChange={handleNameChange}
							sx={{
								width: { xs: "100px", md: "200px" }, 
							}}
						/>
					</Box>

					{/* Cart*/}
					<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
						<IconButton
							onClick={handleCartClick}
							sx={{
								p: 0,
								color: "gray",
								position: "relative",
								"&:hover": {
									"&::after": {
										content: '""',
										position: "absolute",
										width: "100%",
										height: "2px",
										bottom: "-2px",
										left: "50%",
										transform: "translateX(-50%)",
										backgroundColor: "#FFF200",
										transition: "width 0.3s",
									},
								},
							}}
						>
							<Badge badgeContent={cart.length} color="primary">
								<FaShoppingCart size={24} />
							</Badge>
						</IconButton>
					</Box>

					{/* User  */}
					<Box sx={{ flexGrow: 0, display: "flex", marginInline: 3 }}>
						<IconButton
							onClick={toggleUserDrawer}
							sx={{
								p: 0,
								color: "gray",
								position: "relative",
								"&:hover": {
									"&::after": {
										content: '""',
										position: "absolute",
										width: "100%",
										height: "2px",
										bottom: "-2px",
										left: "50%",
										transform: "translateX(-50%)",
										backgroundColor: "#FFF200",
										transition: "width 0.3s",
									},
								},
							}}
						>
							<FaUserAlt size={24} />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>

			{userDrawerOpen && <UserDrawer onClose={toggleUserDrawer} />}
		</>
	);
};
export default Navbar;
