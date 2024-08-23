import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
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
} from "@mui/material";
import { FaShoppingCart, FaBars } from "react-icons/fa";

const Navbar = ({ handleChangeFilter }) => {
	const { cart } = useContext(FirestoreContext);
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);

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

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

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
						sx={{ display: { xs: "block", md: "none" }, color: "gray" }}
					>
						<FaBars size={24} />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
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
						<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
							ARTESIA
						</Link>
					</Typography>
					<Box sx={{ flexGrow: 1, textAlign: "center", position: "relative" }}>
					
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
						>
							<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
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
						{dropdownOpen && (
							<Box
								ref={dropdownRef} 
								sx={{
									position: "absolute",
									top: "100%",
									left: "50%",
									transform: "translateX(-50%)",
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
						>
							<Link
								to="/yourcart"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								Your cart
							</Link>
						</Button>
					</Box>
					<Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
						<IconButton onClick={handleCartClick} sx={{ p: 0, color: "gray" }}>
							<Badge badgeContent={cart.length} color="primary">
								<FaShoppingCart size={24} />
							</Badge>
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Navbar;
