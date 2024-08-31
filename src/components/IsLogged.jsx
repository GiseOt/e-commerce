import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const IsLogged = ({ onLogout }) => {
	const navigate = useNavigate();

	const handleOrdersClick = () => {
		navigate("/orders"); 
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Button
				variant="contained"
				sx={{
					backgroundColor: "#405D72", 
					color: "white",
					position: "relative",
					overflow: "hidden",
					"&:hover": {
						backgroundColor: "#405D72",
						"&::after": {
							content: '""',
							position: "absolute",
							width: "100%",
							height: "2px",
							bottom: 0,
							left: 0,
							backgroundColor: "#FFF200",
							transform: "scaleX(1)",
							transition: "transform 0.3s ease",
						},
					},
					"&::after": {
						content: '""',
						position: "absolute",
						width: "100%",
						height: "2px",
						bottom: 0,
						left: 0,
						backgroundColor: "#FFF200",
						transform: "scaleX(0)",
						transition: "transform 0.3s ease",
					},
				}}
				onClick={handleOrdersClick}
			>
				Orders
			</Button>
			<Button
				variant="contained"
				sx={{
					backgroundColor: "#9E9E9E", 
					color: "white",
					position: "relative",
					overflow: "hidden",
					"&:hover": {
						backgroundColor: "#9E9E9E",
						"&::after": {
							content: '""',
							position: "absolute",
							width: "100%",
							height: "2px",
							bottom: 0,
							left: 0,
							backgroundColor: "#FFF200",
							transform: "scaleX(1)",
							transition: "transform 0.3s ease",
						},
					},
					"&::after": {
						content: '""',
						position: "absolute",
						width: "100%",
						height: "2px",
						bottom: 0,
						left: 0,
						backgroundColor: "#FFF200",
						transform: "scaleX(0)",
						transition: "transform 0.3s ease",
					},
				}}
				onClick={onLogout}
			>
				Logout
			</Button>
		</Box>
	);
};

export default IsLogged;
