import "./App.css";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { FirestoreProvider } from "./contex/FireStoreContext";
import { AuthProvider } from "./contex/AuthContext";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import YourCart from "./components/YourCart";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import { CssBaseline } from "@mui/material";

//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";

function App() {
    
 // Category Filter
	const [categoryFilter, setCategoryFilter] = useState("");

	const handleChangeFilter = (filterCategory, value) => {
		if (filterCategory === "category") {
			if (value === "" || value === "all") {
				setCategoryFilter("");
			} else {
				setCategoryFilter(value);
			}
		} 
    }

	return (
		<AuthProvider>
			<FirestoreProvider>
				<div>
					<CssBaseline />
					<Navbar handleChangeFilter={handleChangeFilter} />
					<CustomCursor />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/product/:id" element={<ProductDetail />} />
						<Route path="/yourcart" element={<YourCart />} />
						<Route path="/orders" element={<Orders />} />
						<Route
							path="/categories/:category"
							element={<ProductList categoryFilter={categoryFilter} />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</FirestoreProvider>
		</AuthProvider>
	);
}

export default App;
