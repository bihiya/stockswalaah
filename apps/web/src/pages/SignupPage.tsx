import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { signedIn } from "../store/slices/authSlice";

export function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => authApi.signup(name, email, password),
    onSuccess: (result) => {
      dispatch(signedIn({
        accessToken: result.accessToken,
        email: result.user.email,
        name: result.user.name,
      }));
      navigate("/dashboard", { replace: true });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    setPasswordError("");
    mutation.mutate();
  };

  return (
    <Box className="login-page">
      <Box component="form" onSubmit={handleSubmit} className="login-form">
        <Typography className="form-kicker">CREATE YOUR ACCOUNT</Typography>
        <Typography variant="h2">Start investing with clarity</Typography>
        {mutation.isError && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {mutation.error instanceof Error ? mutation.error.message : "Unable to create account"}
          </Alert>
        )}
        {passwordError && <Alert severity="error" sx={{ mt: 3 }}>{passwordError}</Alert>}
        <TextField autoComplete="name" fullWidth label="Full name" value={name}
          onChange={(event) => setName(event.target.value)} required sx={{ mt: 4 }} />
        <TextField autoComplete="email" fullWidth label="Email address" type="email" value={email}
          onChange={(event) => setEmail(event.target.value)} required sx={{ mt: 2.2 }} />
        <TextField autoComplete="new-password" fullWidth label="Password" type="password" value={password}
          onChange={(event) => setPassword(event.target.value)} required sx={{ mt: 2.2 }} />
        <TextField autoComplete="new-password" fullWidth label="Confirm password" type="password" value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)} required sx={{ mt: 2.2 }} />
        <Button type="submit" variant="contained" size="large" fullWidth
          endIcon={<ArrowForwardRoundedIcon />} disabled={mutation.isPending} sx={{ mt: 3 }}>
          {mutation.isPending ? "Creating account" : "Create account"}
        </Button>
        <Typography sx={{ mt: 3, textAlign: "center" }}>
          Already have an account? <Link href="/login">Sign in</Link>
        </Typography>
      </Box>
    </Box>
  );
}
