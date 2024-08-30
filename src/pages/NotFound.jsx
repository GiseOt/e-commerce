import NotFoundImage from "../../public/notFound-img.png";

const NotFound = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				padding: "150px",
			}}
		>
			<img
				src={NotFoundImage}
				alt="Not Found"
				style={{
					marginRight: "20px",
					width: "300px", 
					height: "auto", 
					maxWidth: "100%", 
				}}
			/>
			<div style={{ textAlign: "center", color: "red" }}>
				404 - PAGE NOT FOUND
			</div>
		</div>
	);
};

export default NotFound;
