import { useContext } from "react";
import { FirestoreContext } from "../contex/FireStoreContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid , Button, Box} from "@mui/material";

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
									backgroundColor="#EEEDEB"
									width={50}
									margin="auto"
								>
									€{product.price}
								</Typography>
								<Box
									sx={{
										textAlign: "center",
										mx: 2,
										my: 2,
										color: "gray",
										position: "relative",

										"&:hover::after": {
											width: "100%",
										},
									}}
								>
									<Button variant="outlined">
										<Link
											to={`/product/${product.id}`}
											style={{ textDecoration: "none", color: "inherit" }}
										>
											View Details
										</Link>
									</Button>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default ProductList;