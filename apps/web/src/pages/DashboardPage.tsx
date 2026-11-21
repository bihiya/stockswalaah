import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NorthEastRoundedIcon from "@mui/icons-material/NorthEastRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";

const summary = [
  {
    label: "PORTFOLIO VALUE",
    value: "--",
    note: "No linked portfolio",
    tone: "green",
  },
  {
    label: "TODAY'S CHANGE",
    value: "--",
    note: "Awaiting market data",
    tone: "neutral",
  },
  {
    label: "ACTIVE HOLDINGS",
    value: "--",
    note: "No holdings yet",
    tone: "orange",
  },
];

export function DashboardPage() {
  return (
    <Box className="dashboard-page">
      <Box className="page-heading">
        <Box>
          <Typography className="page-date">
            MONDAY · MARKET OVERVIEW
          </Typography>
          <Typography variant="h1">Good morning.</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddRoundedIcon />}>
          Add investment
        </Button>
      </Box>
      <Box className="summary-grid">
        {summary.map((item) => (
          <Paper
            key={item.label}
            elevation={0}
            className={`summary-panel tone-${item.tone}`}
          >
            <Typography className="summary-label">{item.label}</Typography>
            <Typography className="summary-value">{item.value}</Typography>
            <Typography className="summary-note">{item.note}</Typography>
          </Paper>
        ))}
      </Box>
      <Box className="dashboard-lower-grid">
        <Paper elevation={0} className="holdings-panel">
          <Box className="panel-heading">
            <Box>
              <Typography variant="h3">Portfolio performance</Typography>
              <Typography className="panel-subtitle">
                Your portfolio value over time
              </Typography>
            </Box>
            <Chip label="1M" size="small" variant="outlined" />
          </Box>
          <Box className="empty-chart">
            <Box className="chart-icon">
              <ShowChartRoundedIcon />
            </Box>
            <Typography variant="h3">Your portfolio starts here</Typography>
            <Typography className="empty-copy">
              Connect your investments to see performance and movement.
            </Typography>
          </Box>
        </Paper>
        <Paper elevation={0} className="market-panel">
          <Box className="panel-heading">
            <Box>
              <Typography variant="h3">Market pulse</Typography>
              <Typography className="panel-subtitle">
                A snapshot of the day
              </Typography>
            </Box>
            <NorthEastRoundedIcon className="panel-link-icon" />
          </Box>
          <Box className="market-index">
            <Box>
              <Typography className="index-name">NIFTY 50</Typography>
              <Typography className="index-value">--</Typography>
            </Box>
            <Typography className="index-change">--</Typography>
          </Box>
          <Box className="market-index">
            <Box>
              <Typography className="index-name">SENSEX</Typography>
              <Typography className="index-value">--</Typography>
            </Box>
            <Typography className="index-change">--</Typography>
          </Box>
          <Typography className="market-disclaimer">
            Market data connection is not configured.
          </Typography>
        </Paper>
      </Box>
      <Typography className="dashboard-footer">
        StockWallah Platform · Market data may be delayed
      </Typography>
    </Box>
  );
}
