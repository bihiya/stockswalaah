import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../services/authApi";
import { useAppDispatch } from "../store/hooks";
import { signedIn } from "../store/slices/authSlice";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const mutation = useMutation({
    mutationFn: () => authApi.login(email, password),
    onSuccess: (result) => {
      dispatch(signedIn({ accessToken: result.accessToken, email }));
      navigate(location.state?.from?.pathname ?? "/dashboard", {
        replace: true,
      });
    },
  });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <Box className="login-page">
      <Box className="login-aside">
        <Box className="brand-lockup">
          <span className="brand-mark">S</span>
          <Typography variant="h3">stockwallah</Typography>
        </Box>
        <Box className="login-aside-copy">
          <Typography className="eyebrow">YOUR CAPITAL, IN CONTEXT</Typography>
          <Typography variant="h1">Invest with a clearer view.</Typography>
          <Typography className="aside-description">
            A focused workspace for the decisions behind your portfolio.
          </Typography>
          <Box className="market-note">
            <span className="market-dot" /> MARKET OVERVIEW{" "}
            <span className="market-note-date">NSE · BSE</span>
          </Box>
        </Box>
        <Typography className="aside-footer">
          MARKET INTELLIGENCE, MADE PERSONAL
        </Typography>
      </Box>
      <Box className="login-main">
        <Box component="form" onSubmit={handleSubmit} className="login-form">
          <Typography className="form-kicker">WELCOME BACK</Typography>
          <Typography variant="h2">Sign in to your account</Typography>
          <Typography className="form-subtitle">
            Your market workspace is waiting.
          </Typography>
          {mutation.isError && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Unable to sign in"}
            </Alert>
          )}
          <TextField
            autoComplete="email"
            fullWidth
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            sx={{ mt: 4 }}
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            sx={{ mt: 2.2 }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            endIcon={<ArrowForwardRoundedIcon />}
            disabled={mutation.isPending}
            sx={{ mt: 3 }}
          >
            {mutation.isPending ? "Signing in" : "Continue"}
          </Button>
          <Typography className="form-footnote">
            SECURE ACCESS · STOCKWALLAH PLATFORM
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
