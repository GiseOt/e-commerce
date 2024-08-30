import { useState, useEffect } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import IsLogged from "./IsLogged";

import { Box, Button, Link } from "@mui/material";

const UserDrawer = ({ onClose }) => {
	const [isRegistering, setIsRegistering] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [authError, setAuthError] = useState("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	// Authentication
	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
			}
		});
		return () => unsubscribe();
	}, []);

	// Login
	const onLoginSubmit = async (data) => {
		const auth = getAuth();
		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			setAuthError("");
			handleClose();
			setIsAuthenticated(true);
			navigate("/");
		} catch (error) {
			let message = "Incorrect email or password";
			if (
				error.code === "auth/wrong-password" ||
				error.code === "auth/user-not-found"
			) {
				message = "Incorrect email or password";
			} else {
				message = error.message;
			}
			setAuthError(message);
		}
	};

	// Register
	const onRegisterSubmit = async (data) => {
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			const user = userCredential.user;
			const newUser = {
				username: data.name,
				email: data.email,
				orders: [],
				cart: [],
				id: user.uid,
			};
			await setDoc(doc(db, "users", user.uid), newUser);
			setAuthError("");
			handleClose();
			setIsAuthenticated(true);
			navigate("/");
		} catch (error) {
			let message = "An error occurred. Please try again.";
			if (error.code === "auth/email-already-in-use") {
				message = "Email already in use";
			} else if (error.code === "auth/weak-password") {
				message = "Password must be at least 6 characters long";
			} else {
				message = error.message;
			}
			setAuthError(message);
		}
	};

	// Logout
	const handleLogout = async () => {
		const auth = getAuth();
		try {
			await signOut(auth);
			setIsAuthenticated(false);
			handleClose();
			navigate("/");
		} catch (error) {
			setAuthError("Failed to log out. Please try again.");
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(onClose, 300);
	};

	useEffect(() => {
		setIsOpen(true);
	}, []);

	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				right: 0,
				width: "300px",
				height: "100%",
				bgcolor: "white",
				boxShadow: 3,
				p: 2,
				zIndex: 1201,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				transition: "transform 0.3s ease-in-out",
				transform: isOpen ? "translateX(0)" : "translateX(100%)",
			}}
		>
			<Button onClick={handleClose} sx={{ mb: 2 }}>
				Close
			</Button>
			{isAuthenticated ? (
				<IsLogged onLogout={handleLogout} />
			) : isRegistering ? (
				<Register onRegisterSubmit={onRegisterSubmit} authError={authError} />
			) : (
				<Login onLoginSubmit={onLoginSubmit} authError={authError} />
			)}
			{!isAuthenticated && (
				<Link
					to={isRegistering ? "/login" : "/register"}
					onClick={() => setIsRegistering(!isRegistering)}
					sx={{ mt: 2 }}
					component="a"
				>
					{isRegistering
						? "Already have an account? Login"
						: "Don’t have an account? Register"}
				</Link>
			)}
		</Box>
	);
};

export default UserDrawer;
