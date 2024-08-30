import React, { useContext } from "react";
import { AuthContext } from "../contex/AuthContext";
import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	CircularProgress,
	Divider,
	ListItemAvatar,
	Avatar,
} from "@mui/material";

const Orders = () => {
	const { orders, error, loading } = useContext(AuthContext);

	//Orders view 
    
	if (loading) {
		return (
			<Box sx={{ p: 2, textAlign: "center" }}>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ p: 2 }}>
				<Typography color="error">Error: {error.message}</Typography>
			</Box>
		);
	}

	if (orders.length === 0) {
		return (
			<Box sx={{ p: 2, marginTop: "100px", backgroundColor: "#f9f9f9" }}>
				<Typography variant="h6" color="text.secondary">
					No orders found.
				</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ p: 2, marginTop: "100px", backgroundColor: "#f9f9f9" }}>
			<Typography
				variant="h6"
				gutterBottom
				sx={{ color: "#333", fontWeight: "bold" }}
			>
				Your Orders
			</Typography>
			<List>
				{orders.map((order, index) => (
					<React.Fragment key={order.id}>
						<ListItem
							sx={{
								bgcolor: "#fff",
								border: "1px solid #ddd",
								borderRadius: "4px",
								mb: 1,
								p: 2,
								boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
							}}
						>
							<ListItemText
								primary={`Order ID: ${order.id}`}
								secondary={`Total: $${order.total} - Date: ${new Date(
									order.date.seconds * 1000
								).toLocaleDateString()}`}
								primaryTypographyProps={{ color: "#000", fontWeight: "bold" }}
								secondaryTypographyProps={{ color: "#666" }}
							/>
						</ListItem>
						<List sx={{ pl: 4 }}>
							{order.products.map((product, idx) => (
								<ListItem
									key={idx}
									sx={{
										bgcolor: "#fff",
										border: "1px solid #ddd",
										borderRadius: "4px",
										mb: 1,
										p: 1,
										boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
									}}
								>
									<ListItemAvatar>
										<Avatar
											alt={product.name}
											src={
												product.imageUrl ||
												"/static/images/avatar/placeholder.jpg"
											}
											sx={{ bgcolor: "#FFF200" }}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={product.name}
										secondary={`Price: $${product.price}`}
										primaryTypographyProps={{ color: "#333" }}
										secondaryTypographyProps={{ color: "#888" }}
									/>
								</ListItem>
							))}
						</List>
						{index < orders.length - 1 && (
							<Divider sx={{ my: 2, bgcolor: "#405D72" }} />
						)}
					</React.Fragment>
				))}
			</List>
		</Box>
	);
};

export default Orders;
