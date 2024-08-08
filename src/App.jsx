import "./App.css";
import { CssBaseline } from "@mui/material";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import { FirestoreProvider } from "./contex/FireStoreContext";

function App() {
	return (
		<FirestoreProvider>
			<div>
				<CssBaseline />
				<Navbar />
				<CustomCursor />
				<ProductList />
			</div>
		</FirestoreProvider>
	);
}

export default App;
