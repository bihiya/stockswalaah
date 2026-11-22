import { Box, Chip, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMarketStream } from "../hooks/useMarketStream";

const events = [
  { time: "09:42 AM", title: "Market opened higher", description: "NIFTY 50 began the session in positive territory.", type: "Market" },
  { time: "Yesterday", title: "RELIANCE added to watchlist", description: "A sample activity item for your preview account.", type: "Portfolio" },
  { time: "May 18", title: "Portfolio snapshot created", description: "Your demo holdings were refreshed with sample values.", type: "Update" },
];

export function ActivityPage() {
  const [loading, setLoading] = useState(true);
  const { connected, live } = useMarketStream();
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 450); return () => window.clearTimeout(timer); }, []);
  return <Box className="dashboard-page"><Box className="page-heading"><Box><Typography className="page-date">RECENT UPDATES</Typography><Typography variant="h1">Activity</Typography><Typography className="panel-subtitle">A feed of demo market and portfolio events.</Typography></Box><Chip label={connected ? (live ? "Live connection" : "Demo stream active") : "Reconnecting"} color={connected ? "success" : "default"} variant="outlined" /></Box>
    <Paper elevation={0} className="holdings-panel">{loading ? <Box>{[1, 2, 3].map((item) => <Box className="holding-row" key={item}><Box><Typography>Loading activity</Typography></Box></Box>)}</Box> : events.map((event) => <Box className="activity-row" key={event.title}><Box className="activity-marker" /><Box sx={{ flex: 1 }}><Box className="panel-heading"><Typography fontWeight={600}>{event.title}</Typography><Chip size="small" label={event.type} variant="outlined" /></Box><Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{event.description}</Typography><Typography variant="caption" color="text.secondary">{event.time}</Typography></Box></Box>)}</Paper>
  </Box>;
}
