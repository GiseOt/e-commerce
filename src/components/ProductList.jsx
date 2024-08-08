import { useContext } from "react";
import { FirestoreContext } from "../contex/FireStoreContext";
import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";

const ProductList = () => {
	const { products, error } = useContext(FirestoreContext);

	if (error)
		return (
			<Typography variant="h6" color="error">
				Error: {error.message}
			</Typography>
		);

	return (
		<div>
			<Grid container spacing={3} sx={{ marginTop: "80px" }}>
				{products.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product.id}>
						<Card
							sx={{
								maxWidth: 345,
								position: "relative",
								transition: "transform 0.3s ease",
								"&:hover": {
									transform: "scale(1.03)",
								},
							}}
						>
							<CardMedia
								component="img"
								sx={{ height: 400, objectFit: "cover" }}
								image={product.img}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant="h5"
									component="div"
									textAlign="center"
								>
									{product.name}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="center"
								>
									{product.category}{" "}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="center"
								>
									€{product.price}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ProductList;