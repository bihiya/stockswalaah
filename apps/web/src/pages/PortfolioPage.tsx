import { Box, Chip, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useToast } from "../components/ToastProvider";

const positions = [
  { symbol: "RELIANCE", company: "Reliance Industries", quantity: 12, price: "₹2,851.00", value: "₹34,212", change: "+1.24%" },
  { symbol: "TCS", company: "Tata Consultancy Services", quantity: 8, price: "₹3,980.00", value: "₹31,840", change: "+0.82%" },
  { symbol: "HDFCBANK", company: "HDFC Bank", quantity: 20, price: "₹1,658.00", value: "₹33,160", change: "−0.31%" },
  { symbol: "INFY", company: "Infosys Limited", quantity: 15, price: "₹1,482.00", value: "₹22,230", change: "+0.56%" },
  { symbol: "ITC", company: "ITC Limited", quantity: 30, price: "₹438.50", value: "₹13,155", change: "−0.12%" },
];

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 500); return () => window.clearTimeout(timer); }, []);
  return <Box className="dashboard-page">
    <Box className="page-heading"><Box><Typography className="page-date">YOUR INVESTMENTS · SAMPLE DATA</Typography><Typography variant="h1">Portfolio</Typography><Typography className="panel-subtitle">Track a sample of your holdings and daily movement.</Typography></Box><Chip label="Demo portfolio" color="success" variant="outlined" /></Box>
    <Paper elevation={0} className="holdings-panel"><Box className="panel-heading"><Box><Typography variant="h3">Holdings</Typography><Typography className="panel-subtitle">Values are illustrative and not connected to a brokerage account.</Typography></Box></Box>
      <Box className="table-header holding-row"><Typography>ASSET</Typography><Typography>SHARES</Typography><Typography>PRICE</Typography><Typography>VALUE</Typography><Typography>DAY</Typography></Box>
      {positions.map((position) => <Box className="holding-row portfolio-row" key={position.symbol}><Box><Typography fontWeight={600}>{position.symbol}</Typography><Typography variant="caption" color="text.secondary">{position.company}</Typography></Box><Typography>{position.quantity}</Typography><Typography>{position.price}</Typography><Typography fontWeight={600}>{position.value}</Typography><Typography color={position.change.startsWith("+") ? "success.main" : "error.main"}>{position.change}</Typography></Box>)}
    </Paper>
    <Box sx={{ mt: 2 }}><Chip label="Sample data only" size="small" onClick={() => showToast("Portfolio values are illustrative, not live financial data.", "info")} /></Box>
  </Box>;
}
