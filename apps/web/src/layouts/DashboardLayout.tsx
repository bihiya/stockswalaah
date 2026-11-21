import { Outlet, useNavigate } from "react-router-dom";
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
import { useAppDispatch } from "../store/hooks";
import { signedOut } from "../store/slices/authSlice";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { label: "Overview", icon: <SpaceDashboardOutlinedIcon />, active: true },
  { label: "Portfolio", icon: <ShowChartOutlinedIcon />, active: false },
  { label: "Activity", icon: <NotificationsNoneOutlinedIcon />, active: false },
];

export function DashboardLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userEmail } = useAuth();
  const handleSignOut = () => {
    dispatch(signedOut());
    navigate("/login");
  };

  return (
    <Box className="dashboard-shell">
      <AppBar position="fixed" color="inherit" elevation={0} className="topbar">
        <Toolbar className="topbar-inner">
          <Box className="brand-lockup">
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
            <Avatar className="user-avatar">
              {userEmail?.slice(0, 1).toUpperCase() ?? "S"}
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="aside" className="sidebar">
        <Typography className="nav-caption">WORKSPACE</Typography>
        <List disablePadding>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              selected={item.active}
              className="nav-item"
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
        <Box className="sidebar-bottom">
          <ListItemButton className="nav-item">
            <ListItemIcon>
              <SettingsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
          <Button
            startIcon={<LogoutOutlinedIcon />}
            onClick={handleSignOut}
            className="logout-button"
          >
            Sign out
          </Button>
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
