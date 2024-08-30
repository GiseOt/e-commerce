import ProductList from "../components/ProductList";

const Home = ({ nameFilter, categoryFilter }) => {
	

	return (
		<div>
			<ProductList categoryFilter={categoryFilter} nameFilter={nameFilter} />
		</div>
	);
};

export default Home;
