import { useForm } from "react-hook-form";
import { TextField, Button, Typography } from "@mui/material";

const Register = ({ onRegisterSubmit, authError }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	return (
		<form
			onSubmit={handleSubmit(onRegisterSubmit)}
			style={{ display: "flex", flexDirection: "column", gap: "16px" }}
		>
			<Typography variant="h6">Register</Typography>
			{authError && <Typography color="error">{authError}</Typography>}
			<TextField
				{...register("name", { required: "Name is required" })}
				label="Name"
				variant="outlined"
				size="small"
				error={!!errors.name}
				helperText={errors.name?.message}
			/>
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
			<TextField
				{...register("confirmPassword", {
					required: "Confirm your password",
					validate: (value) =>
						value === watch("password") || "Passwords do not match",
				})}
				label="Confirm Password"
				type="password"
				variant="outlined"
				size="small"
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword?.message}
			/>
			<Button type="submit" variant="contained" color="primary">
				Register
			</Button>
		</form>
	);
};

export default Register;
