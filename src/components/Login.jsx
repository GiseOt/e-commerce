import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";

const Login = ({ onLoginSubmit, authError }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	return (
		<form
			onSubmit={handleSubmit(onLoginSubmit)}
			style={{ display: "flex", flexDirection: "column", gap: "16px" }}
		>
			<Typography variant="h6">Login</Typography>
			{authError && <Typography color="error">{authError}</Typography>}
			<TextField
				{...register("email", {
					required: "Email is required",
					pattern: {
						value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
						message: "Invalid email address",
					},
				})}
				label="Email"
				variant="outlined"
				size="small"
				error={!!errors.email}
				helperText={errors.email?.message}
			/>
			<TextField
				{...register("password", {
					required: "Password is required",
					minLength: {
						value: 6,
						message: "Password must be at least 6 characters long",
					},
				})}
				label="Password"
				type="password"
				variant="outlined"
				size="small"
				error={!!errors.password}
				helperText={errors.password?.message}
			/>
			<Button type="submit" variant="contained" color="primary">
				Login
			</Button>
		</form>
	);
};

export default Login;
