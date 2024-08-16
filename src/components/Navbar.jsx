import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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

const Navbar = () => {
	const { cart } = useContext(FirestoreContext);
	const navigate = useNavigate();

	const handleCartClick = () => {
		navigate("/yourcart");
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
						>
							<Link
								to="/categories"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								Categories
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
