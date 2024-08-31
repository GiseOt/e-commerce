import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Menu, MenuItem } from "@mui/material";

const Categories = ({ options, label }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ position: "relative", display: "inline-block" }}>
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
				onClick={handleClick}
			>
				{label}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "categories-button",
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option.value}
						component={Link}
						to={`/categories/${option.value}`}
						onClick={handleClose} 
						sx={{
							textDecoration: "none",
							color: "gray",
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</Box>
	);
};

export default Categories;
