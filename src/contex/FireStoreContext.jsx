import { createContext, useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
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

	//Cart

	const addToCart = (product) => {
		setCart((currentCart) => [
			...currentCart,
			{ ...product, index: currentCart.length },
		]);
	};

	const removeFromCart = (index) => {
		setCart((currentCart) =>
			currentCart.filter((item) => item.index !== index)
		);
	};
	const emptyCart = () => {
		setCart([]);
	};

	return (
		<FirestoreContext.Provider
			value={{ products, cart, addToCart, removeFromCart, error, emptyCart }}
		>
			{children}
		</FirestoreContext.Provider>
	);
};
