import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains, isInt } from "validator";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "", // New field: age
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value.trim() !== "" && isInt(value) && parseInt(value) > 75) {
      setFormData({ ...formData, [name]: "75" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};
  
    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }
  
    if (contains(formData.username, " ")) {
      errors.username = "Must contain only valid characters";
    }
  
    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }
  
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }
  
    if (!["male", "female"].includes(formData.gender)) {
      errors.gender = "Please select a valid gender";
    }
  
    if (formData.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be 10 characters long";
    }
  
    if (!isInt(formData.age)) {
      errors.age = "Age must be a valid integer";
    } else if (parseInt(formData.age) < 18) {
      errors.age = "Account cannot be created if age is less than 18";
    }
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(errors);
  
    return errors;
  };
  

  return (
    <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            ConneKt
          </Link>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        <Typography color="text.secondary">Already have an account?</Typography>
        <Button
          variant="text"
          sx={{ minWidth: 65 }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />

          <TextField
            select
            label="Gender"
            fullWidth
            margin="normal"
            required
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={errors.gender !== undefined}
            helperText={errors.gender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>

          <TextField
            label="Email Address"
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />

          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            required
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber !== undefined}
            helperText={errors.phoneNumber}
          />

          <TextField
            label="Password"
            fullWidth
            required
            margin="normal"
            autoComplete="new-password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />

<TextField
  label="Confirm Password"
  fullWidth
  required
  margin="normal"
  autoComplete="new-password"
  id="confirmPassword"
  name="confirmPassword"
  type="password"
  onChange={handleChange}
  error={errors.confirmPassword !== undefined}
  helperText={errors.confirmPassword || ""}
/>


          {/* Age Field */}
          <TextField
            label="Age"
            fullWidth
            margin="normal"
            required
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            error={errors.age !== undefined}
            helperText={errors.age}
          />

          <ErrorAlert error={serverError} />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Sign Up
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
