import { useState } from "react";
import { Box, Button, FormControlLabel, Paper, Switch, Typography } from "@mui/material";
import { useToast } from "../components/ToastProvider";

export function SettingsPage() {
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(false);
  const { showToast } = useToast();
  return <Box className="dashboard-page"><Box className="page-heading"><Box><Typography className="page-date">PREFERENCES</Typography><Typography variant="h1">Settings</Typography><Typography className="panel-subtitle">Manage your demo workspace preferences.</Typography></Box></Box>
    <Paper elevation={0} className="holdings-panel settings-panel"><Typography variant="h3">Notifications</Typography><Typography className="panel-subtitle">Choose which updates you’d like to see in this preview.</Typography><FormControlLabel control={<Switch checked={marketAlerts} onChange={(event) => setMarketAlerts(event.target.checked)} />} label="Market movement alerts" /><FormControlLabel control={<Switch checked={weeklySummary} onChange={(event) => setWeeklySummary(event.target.checked)} />} label="Weekly portfolio summary" /><Button variant="contained" sx={{ mt: 2, alignSelf: "flex-start" }} onClick={() => showToast("Your demo preferences have been saved.")}>Save preferences</Button></Paper>
    <Paper elevation={0} className="holdings-panel settings-panel" sx={{ mt: 2 }}><Typography variant="h3">Demo workspace</Typography><Typography className="panel-subtitle">All portfolio and market figures in this workspace are sample data.</Typography></Paper>
  </Box>;
}
