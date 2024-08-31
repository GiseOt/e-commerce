import { Box, Typography } from "@mui/material";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
	return (
		<Box
			sx={{
				bgcolor: "transparent",
				color: "#405D72",
				py: 1,
				px: 4,
				textAlign: "center",
				width: "100%",
				boxSizing: "border-box",
				mt: "80px",
				borderTop: "1px solid #405D72",
			}}
		>
			<Typography variant="h6" component="div" sx={{ mb: 1, color: "#405D72" }}>
				Artesia
			</Typography>
			<Typography
				variant="body2"
				component="div"
				sx={{ mb: 2, color: "#405D72" }}
			>
				© {new Date().getFullYear()} Artesia. All rights reserved.
			</Typography>
			<Box sx={{ mt: 2 }}>
				<a
					href="https://www.linkedin.com/in/gisellaortizdelatabla/"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						color: "#405D72",
						marginRight: "8px",
						verticalAlign: "middle",
					}}
				>
					<FaLinkedin size={25} />
				</a>
				<Typography
					variant="body2"
					component="div"
					sx={{ display: "inline", color: "#405D72" }}
				>
					Made by Gisella Ortiz de la Tabla
				</Typography>
			</Box>
		</Box>
	);
};

export default Footer;
