import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FirestoreContext } from "../contex/FireStoreContext";
import NotFound from "../pages/NotFound"
import { Typography, Box, Button } from "@mui/material"; 

const ProductDetail = () => {
	const { id } = useParams();
	const { products, error } = useContext(FirestoreContext);

	const product = products.find((product) => product.id === id);

	console.log("Product ID:", id);
	if (product) {
		console.log("Product Name:", product.name);
	} else {
		console.log("Product not found");
	}

	if (error) {
		return (
			<Typography variant="h6" color="error">
				Error: {error.message}
			</Typography>
		);
	}

	return (
		<Box
			sx={{
				marginTop: "80px",
				padding: "16px",
				maxWidth: "600px",
				margin: "auto",
               
			}}
		>
			<Typography
				variant="h4"
				gutterBottom
				sx={{
					marginTop: "80px",
				}}
			>
				Product Detail
			</Typography>
			{product ? (
				<Box sx={{ textAlign: "center" }}>
					<img
						src={product.img}
						alt={product.name}
						style={{
							maxWidth: "60%",
							height: "auto",
							borderRadius: "8px",
							marginBottom: "16px",
						}}
					/>
					<Typography variant="h5" gutterBottom>
						{product.name}
					</Typography>
					<Typography variant="body2" color="text.secondary" gutterBottom>
						{product.category}
					</Typography>
					<Typography variant="body1" color="text.secondary" gutterBottom>
						€{product.price}
					</Typography>
					<Typography variant="body2" color="text.secondary" paragraph>
						{product.description}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						sx={{
							mt: 2,
							backgroundColor: "#FF6F61",
							"&:hover": { backgroundColor: "#FF3B30" },
						}}
					>
						Add to Cart
					</Button>
				</Box>
			) : (
				<NotFound />
			)}
		</Box>
	);
};

export default ProductDetail;
