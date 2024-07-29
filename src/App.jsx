import './App.css'
import CustomCursor from './components/CustomCursor';
import Navbar from "./components/Navbar"

import { CssBaseline } from "@mui/material";


function App() {


  return (
		<>
			<CssBaseline />
			<Navbar />
			<CustomCursor/>
		</>
	);
}

export default App


