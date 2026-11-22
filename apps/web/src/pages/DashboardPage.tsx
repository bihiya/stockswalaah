import { useEffect, useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, Skeleton, TextField, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
import { useMarketStream } from "../hooks/useMarketStream";
import { useToast } from "../components/ToastProvider";

const summary = [
  { label: "PORTFOLIO VALUE", value: "₹12,84,560", note: "Demo portfolio value", tone: "green" },
  { label: "TODAY'S CHANGE", value: "+₹8,420", note: "+0.66% today · sample data", tone: "neutral" },
  { label: "ACTIVE HOLDINGS", value: "8", note: "Across 6 sectors", tone: "orange" },
];
const holdings = [
  { symbol: "RELIANCE", name: "Reliance Industries", shares: 12, value: "₹34,212", change: "+1.24%" },
  { symbol: "TCS", name: "Tata Consultancy Services", shares: 8, value: "₹31,840", change: "+0.82%" },
  { symbol: "HDFCBANK", name: "HDFC Bank", shares: 20, value: "₹33,160", change: "−0.31%" },
];

export function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("1");
  const { quotes, connected, live } = useMarketStream();
  const { showToast } = useToast();

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, []);

  const addInvestment = () => {
    if (!symbol.trim() || Number(quantity) < 1) return;
    showToast(`${quantity} share${Number(quantity) === 1 ? "" : "s"} of ${symbol.toUpperCase()} added to your demo portfolio.`);
    setModalOpen(false);
    setSymbol("");
    setQuantity("1");
  };

  return (
    <Box className="dashboard-page">
      <Box className="page-heading">
        <Box><Typography className="page-date">MARKET OVERVIEW · SAMPLE DATA</Typography><Typography variant="h1">Good morning.</Typography><Typography className="panel-subtitle">Here’s what’s happening with your investments today.</Typography></Box>
        <Tooltip title="Add a sample investment to your demo portfolio"><Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setModalOpen(true)}>Add investment</Button></Tooltip>
      </Box>
      <Box className="summary-grid">
        {summary.map((item) => <Paper key={item.label} elevation={0} className={`summary-panel tone-${item.tone}`}>
          <Typography className="summary-label">{item.label}</Typography>
          {loading ? <Skeleton variant="text" width="55%" height={44} sx={{ mt: 1 }} /> : <Typography className="summary-value">{item.value}</Typography>}
          {loading ? <Skeleton variant="text" width="70%" /> : <Typography className="summary-note">{item.note}</Typography>}
        </Paper>)}
      </Box>
      <Box className="dashboard-lower-grid">
        <Paper elevation={0} className="holdings-panel" id="portfolio">
          <Box className="panel-heading"><Box><Typography variant="h3">Portfolio performance</Typography><Typography className="panel-subtitle">Your portfolio value over time · sample data</Typography></Box><Chip label="1M" size="small" variant="outlined" /></Box>
          {loading ? <Skeleton variant="rounded" height={220} sx={{ mt: 3 }} /> : <Box className="empty-chart"><Box className="chart-icon"><ShowChartRoundedIcon /></Box><Typography variant="h3">Your portfolio is taking shape</Typography><Typography className="empty-copy">Your demo portfolio is ready. Add an investment to start tracking positions.</Typography></Box>}
        </Paper>
        <Paper elevation={0} className="market-panel">
          <Box className="panel-heading"><Box><Typography variant="h3">Market pulse</Typography><Typography className="panel-subtitle">{live ? "Live market stream" : "Simulated demo quotes"}</Typography></Box><Tooltip title={live ? "Connected to the configured market WebSocket" : "Demo quotes update locally; configure VITE_WS_URL for a live feed"}><Chip size="small" color={connected ? "success" : "default"} label={connected ? (live ? "LIVE" : "DEMO") : "OFFLINE"} /></Tooltip></Box>
          {quotes.map((quote) => <Box className="market-index" key={quote.symbol}><Box><Typography className="index-name">{quote.symbol}</Typography><Typography className="index-value">{quote.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</Typography></Box><Typography className="index-change" sx={{ color: quote.change >= 0 ? "success.main" : "error.main" }}>{quote.change >= 0 ? "+" : ""}{quote.change.toFixed(2)}%</Typography></Box>)}
          <Typography className="market-disclaimer">Illustrative values only — not financial advice.</Typography>
        </Paper>
      </Box>
      <Paper elevation={0} className="holdings-panel holdings-preview"><Box className="panel-heading"><Box><Typography variant="h3">Top holdings</Typography><Typography className="panel-subtitle">A snapshot of your demo positions</Typography></Box><Button href="/portfolio" size="small">View portfolio</Button></Box>
        {holdings.map((holding) => <Box className="holding-row" key={holding.symbol}><Box><Typography fontWeight={600}>{holding.symbol}</Typography><Typography variant="caption" color="text.secondary">{holding.name} · {holding.shares} shares</Typography></Box><Box textAlign="right"><Typography fontWeight={600}>{holding.value}</Typography><Typography variant="caption" color={holding.change.startsWith("+") ? "success.main" : "error.main"}>{holding.change}</Typography></Box></Box>)}
      </Paper>
      <Typography className="dashboard-footer">StockWallah Platform · Demo data for preview purposes only</Typography>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add an investment</DialogTitle>
        <DialogContent><Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>Create a sample holding in your local demo view.</Typography><TextField autoFocus fullWidth label="Stock symbol" placeholder="e.g. INFY" value={symbol} onChange={(event) => setSymbol(event.target.value)} sx={{ mt: 1 }} /><TextField select fullWidth label="Quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)} sx={{ mt: 2 }}>{[1, 2, 5, 10, 25, 50].map((value) => <MenuItem key={value} value={String(value)}>{value} shares</MenuItem>)}</TextField></DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}><Button onClick={() => setModalOpen(false)}>Cancel</Button><Button variant="contained" disabled={!symbol.trim()} onClick={addInvestment}>Add to demo</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
