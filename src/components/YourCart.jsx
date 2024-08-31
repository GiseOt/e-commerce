import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { FirestoreContext } from "../contex/FireStoreContext";
import { db } from "../../firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";
import UserDrawer from "./UserDrawer"; 
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
	const { cart, removeFromCart, emptyCart } = useContext(FirestoreContext);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const auth = getAuth();
	const user = auth.currentUser;

	const handleRemoveItem = (id) => {
		removeFromCart(id);
	};

	const handleBuyNow = async () => {
		if (!user) {
			setIsDrawerOpen(true);
			return;
		}

		if (cart.length === 0) {
			Swal.fire({
				icon: "warning",
				title: "Your cart is empty!",
				text: "Please add some items before checking out.",
			});
			return;
		}

		try {
			const orderData = {
				userId: user.uid,
				products: cart,
				date: Timestamp.fromDate(new Date()),
				total: getTotal(),
			};

			await addDoc(collection(db, "orders"), orderData);

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
		} catch (error) {
			console.error("Error saving order:", error);
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Error",
				text: "There was an error saving your order. Please try again.",
			});
		}
	};


	const getTotal = () => {
		return cart.reduce((total, product) => {
			const price = parseFloat(product.price);
			return isNaN(price) ? total : total + price;
		}, 0);
	};

	const totalAmount = getTotal();

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<>
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
								Total: €{totalAmount.toFixed(2)}
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
			{isDrawerOpen && <UserDrawer onClose={handleDrawerClose} />}
		</>
	);
};

export default YourCart;
