import { Outlet, Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { useAppDispatch } from "../store/hooks";
import { signedOut } from "../store/slices/authSlice";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Overview", icon: <SpaceDashboardOutlinedIcon />, to: "/dashboard" },
  { label: "Portfolio", icon: <ShowChartOutlinedIcon />, to: "/dashboard#portfolio" },
  { label: "Activity", icon: <NotificationsNoneOutlinedIcon />, to: "/dashboard#activity" },
];

export function DashboardLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, userEmail } = useAuth();

  const handleSignOut = () => {
    dispatch(signedOut());
    navigate("/dashboard", { replace: true });
  };

  return (
    <Box className="dashboard-shell">
      <AppBar position="fixed" color="inherit" elevation={0} className="topbar">
        <Toolbar className="topbar-inner">
          <Box
            component={RouterLink}
            to="/dashboard"
            className="brand-lockup"
            aria-label="StockWallah overview"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            <span className="brand-mark">S</span>
            <Typography variant="h3">stockwallah</Typography>
          </Box>
          <Box className="topbar-actions">
            <Tooltip title="Notifications">
              <IconButton aria-label="Notifications">
                <NotificationsNoneOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            {isAuthenticated ? (
              <>
                <Typography variant="body2" sx={{ display: { xs: "none", sm: "block" } }}>
                  {userEmail}
                </Typography>
                <Avatar className="user-avatar" aria-label="Signed-in user">
                  {userEmail?.slice(0, 1).toUpperCase() ?? "S"}
                </Avatar>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button component={RouterLink} to="/login" color="inherit" size="small">
                  Sign in
                </Button>
                <Button
                  component={RouterLink}
                  to="/signup"
                  variant="contained"
                  size="small"
                  startIcon={<PersonAddAlt1RoundedIcon />}
                  sx={{ display: { xs: "none", sm: "inline-flex" } }}
                >
                  Create account
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="aside" className="sidebar" aria-label="Main navigation">
        <Typography className="nav-caption">WORKSPACE</Typography>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={RouterLink}
              to={item.to}
              selected={location.pathname === "/dashboard" && item.label === "Overview" && !location.hash}
              className="nav-item"
              aria-label={item.label}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Box className="sidebar-bottom">
          <ListItemButton
            component={RouterLink}
            to="/dashboard#settings"
            className="nav-item"
            aria-label="Settings"
          >
            <ListItemIcon><SettingsOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          {isAuthenticated ? (
            <Button
              startIcon={<LogoutOutlinedIcon />}
              onClick={handleSignOut}
              className="logout-button"
            >
              Sign out
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<LoginRoundedIcon />}
              className="logout-button"
            >
              Sign in
            </Button>
          )}
          <Typography className="sidebar-version">
            PLATFORM PREVIEW · 0.1.0
          </Typography>
        </Box>
      </Box>
      <Box component="main" className="main-content">
        <Outlet />
      </Box>
    </Box>
  );
}
