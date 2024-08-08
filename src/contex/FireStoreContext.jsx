import { createContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const productsCollection = await getDocs(collection(db, "productos"));
				const productsData = productsCollection.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProducts(productsData);
			} catch (err) {
				setError(err);
				console.error("Error fetching data from Firestore: ", err);
			}
		};

		fetchProducts();
	}, []);

	return (
		<FirestoreContext.Provider value={{ products, error }}>
			{children}
		</FirestoreContext.Provider>
	);
};
