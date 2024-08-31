// App.js
import "./App.css";
import { Routes, Route, useNavigate } from "react-router";
import { useState } from "react";
import { FirestoreProvider } from "./contex/FireStoreContext";
import { AuthProvider } from "./contex/AuthContext";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import YourCart from "./components/YourCart";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import { CssBaseline, Box } from "@mui/material";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";

function App() {
	const [categoryFilter, setCategoryFilter] = useState("");
	const [nameFilter, setNameFilter] = useState("");
	const navigate = useNavigate();

	const handleChangeFilter = (filterType, value) => {
		if (filterType === "category") {
			setCategoryFilter(value === "all" ? "" : value);
		} else if (filterType === "name") {
			setNameFilter(value);
			if (value === "" && categoryFilter === "") {
				navigate("/");
			}
		}
	};

	return (
		<AuthProvider>
			<FirestoreProvider>
				<CssBaseline />
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						minHeight: "100vh", 
					}}
				>
					<Navbar handleChangeFilter={handleChangeFilter} />
					<CustomCursor />
					<Box
						sx={{
							flex: 1, 
						}}
					>
						<Routes>
							<Route path="/" element={<Home nameFilter={nameFilter} />} />
							<Route path="/product/:id" element={<ProductDetail />} />
							<Route path="/yourcart" element={<YourCart />} />
							<Route path="/orders" element={<Orders />} />
							<Route
								path="/categories/:category"
								element={
									<ProductList
										categoryFilter={categoryFilter}
										nameFilter={nameFilter}
									/>
								}
							/>
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Box>
					<Footer />
				</Box>
			</FirestoreProvider>
		</AuthProvider>
	);
}

export default App;
