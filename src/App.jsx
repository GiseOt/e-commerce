import "./App.css";
import { Routes, Route } from "react-router";
import { CssBaseline } from "@mui/material";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import YourCart from "./components/YourCart";

//Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import ProductDetail from "./components/ProductDetail";
import { FirestoreProvider } from "./contex/FireStoreContext";

function App() {
	return (
		<FirestoreProvider>
			<div>
				<CssBaseline />
				<Navbar />
				<CustomCursor />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductDetail />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/yourcart" element={<YourCart />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</FirestoreProvider>
	);
}

export default App;
