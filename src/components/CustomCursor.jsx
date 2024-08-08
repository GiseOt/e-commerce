import  { useEffect, useState, useRef } from "react";

const CustomCursor = () => {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [isVisible, setIsVisible] = useState(true);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const handleMouseMove = (event) => {
			setCursorPosition({ x: event.clientX, y: event.clientY });
			setIsVisible(true);

			
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			
			timeoutRef.current = setTimeout(() => {
				setIsVisible(false);
			}, 200); 
		};

		
		document.addEventListener("mousemove", handleMouseMove);

		
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	return (
		<div>
			{/* Cursor Personalizado */}
			<div
				style={{
					position: "fixed",
					top: cursorPosition.y,
					left: cursorPosition.x,
					width: "10px",
					height: "10px",
					backgroundColor: "transparent",
					border: "5px solid #FFF200",
					borderRadius: "50%",
					pointerEvents: "none",
					transform: "translate(-50%, -50%)",
					zIndex: 10000,
					opacity: isVisible ? 1 : 0, 
					transition: "opacity 0.1s ease", 
				}}
			/>
		</div>
	);
};

export default CustomCursor;
