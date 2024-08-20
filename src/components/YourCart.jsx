import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirestoreContext } from "../contex/FireStoreContext";
import {
	Box,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Divider,
	IconButton,
} from "@mui/material";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";


const YourCart = () => {
	const navigate = useNavigate();
	const { cart, removeFromCart , emptyCart } = useContext(FirestoreContext);

	const handleRemoveItem = (id) => {
		removeFromCart(id);
	};

    const handleBuyNow = () => {
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Purchase Successful",
				showConfirmButton: false,
				timer: 2000,
			}).then(() => {
				emptyCart();
				navigate("/");
			});
		};
	const getTotal = () => {
		return cart.reduce((total, product) => {
			const price = parseFloat(product.price);
			if (isNaN(price)) {
				return total;
			}
			return total + price;
		}, 0);
	};

	const totalAmount = getTotal();

	return (
		<Box sx={{ paddingBlock: 12 }}>
			<Typography variant="h4" sx={{ mb: 3 }}>
				Your Cart
			</Typography>
			{cart.length === 0 ? (
				<Typography variant="h6">Your cart is empty</Typography>
			) : (
				<>
					<List>
						{cart.map((item) => (
							<div key={`${item.id}-${item.index}`}>
								<ListItem>
									<ListItemText
										primary={item.name}
										secondary={`€${parseFloat(item.price)}`}
									/>
									<ListItemSecondaryAction>
										<IconButton
											edge="end"
											aria-label="delete"
											color="default"
											onClick={() => handleRemoveItem(item.index)}
										>
											<FaTrash />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
								<Divider />
							</div>
						))}
					</List>
					<Box sx={{ mt: 3, textAlign: "right" }}>
						<Typography variant="h6" sx={{ mb: 2 }}>
							Total: €{totalAmount}
						</Typography>
						<Button
							variant="contained"
						onClick={handleBuyNow}
							sx={{
								backgroundColor: "#405D72",
								color: "white",
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
								position: "relative",
								overflow: "hidden",
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
						>
							Proceed to Checkout
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
};

export default YourCart;
