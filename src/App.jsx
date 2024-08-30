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
import { CssBaseline } from "@mui/material";

//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";

function App() {
	// Category and Name Filters
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
				<div>
					<CssBaseline />
					<Navbar handleChangeFilter={handleChangeFilter} />
					<CustomCursor />
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
				</div>
			</FirestoreProvider>
		</AuthProvider>
	);
}

export default App;
