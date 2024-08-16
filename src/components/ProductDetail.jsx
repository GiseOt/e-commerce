import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FirestoreContext } from "../contex/FireStoreContext";
import NotFound from "../pages/NotFound";
import {
	Typography,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

const ProductDetail = () => {
	const { id } = useParams();
	const { products, addToCart, error } = useContext(FirestoreContext);
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const product = products.find((product) => product.id === id);

	if (error) {
		return <NotFound />;
	}

	const handleAddToCart = () => {
		if (product) {
			addToCart(product);
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleContinueShopping = () => {
		setOpen(false);
		navigate("/");
	};

	const handleGoToCart = () => {
		setOpen(false);
		navigate("/yourcart");
	};

	return (
		<Box
			sx={{
				marginTop: "80px",
				padding: "16px",
				maxWidth: "600px",
				margin: "auto",
			}}
		>
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
							marginTop: "80px",
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
						onClick={handleAddToCart}
					>
						Add to Cart
					</Button>

					{/* Modal */}
					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Product Added to Cart"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								{`${product.name} has been added to your cart.`}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleContinueShopping} color="primary">
								Continue Shopping
							</Button>
							<Button onClick={handleGoToCart} color="primary" autoFocus>
								Go to Cart
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			) : (
				<NotFound />
			)}
		</Box>
	);
};

export default ProductDetail;
