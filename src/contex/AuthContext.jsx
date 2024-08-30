import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [orders, setOrders] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [authUser, setAuthUser] = useState(null);
	const auth = getAuth();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [auth]);

	useEffect(() => {
		let unsubscribe;

        //Orders
		const fetchOrders = () => {
			if (authUser) {
				setLoading(true); 
				const ordersCollection = collection(db, "orders");
				const q = query(ordersCollection, where("userId", "==", authUser.uid));

				unsubscribe = onSnapshot(
					q,
					(querySnapshot) => {
						const fetchedOrders = querySnapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}));
						setOrders(fetchedOrders);
						setLoading(false); 
					},
					(err) => {
						console.error("Error fetching orders:", err);
						setError(err);
						setLoading(false); 
					}
				);
			} else {
				setOrders([]);
				setLoading(false); 
			}
		};

		fetchOrders();

		return () => {
			if (unsubscribe) {
				unsubscribe(); 
			}
		};
	}, [authUser]);

	return (
		<AuthContext.Provider value={{ orders, error, loading }}>
			{children}
		</AuthContext.Provider>
	);
};
