import { useEffect, useState } from "react";

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const initialQuotes: MarketQuote[] = [
  { symbol: "NIFTY 50", name: "Nifty 50", price: 22478.35, change: 0.62 },
  { symbol: "SENSEX", name: "BSE Sensex", price: 73982.12, change: 0.48 },
];

export function useMarketStream() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [connected, setConnected] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const endpoint = import.meta.env.VITE_WS_URL;
    let socket: WebSocket | undefined;
    let reconnectTimer: number | undefined;
    let disposed = false;
    let demoTimer: number | undefined;

    const updateDemoQuotes = () => {
      setQuotes((current) => current.map((quote) => {
        const movement = (Math.random() - 0.48) * (quote.symbol === "NIFTY 50" ? 8 : 24);
        return { ...quote, price: Math.max(0, quote.price + movement), change: quote.change + movement / quote.price * 100 };
      }));
    };

    if (!endpoint) {
      // A clearly labelled local market simulator keeps the UI useful without a WS server.
      setConnected(true);
      setLive(false);
      demoTimer = window.setInterval(updateDemoQuotes, 3500);
      return () => window.clearInterval(demoTimer);
    }

    const connect = () => {
      if (disposed) return;
      try {
        socket = new WebSocket(endpoint);
        socket.onopen = () => { setConnected(true); setLive(true); };
        socket.onmessage = (event) => {
          try {
            const payload = JSON.parse(String(event.data)) as { quotes?: MarketQuote[] } | MarketQuote[];
            const nextQuotes = Array.isArray(payload) ? payload : payload.quotes;
            if (nextQuotes?.length) setQuotes(nextQuotes);
          } catch {
            // Ignore malformed market messages and keep the last valid snapshot.
          }
        };
        socket.onclose = () => {
          setConnected(false);
          setLive(false);
          if (!disposed) reconnectTimer = window.setTimeout(connect, 2500);
        };
        socket.onerror = () => socket?.close();
      } catch {
        setConnected(false);
        setLive(false);
        reconnectTimer = window.setTimeout(connect, 2500);
      }
    };
    connect();
    return () => {
      disposed = true;
      if (reconnectTimer) window.clearTimeout(reconnectTimer);
      socket?.close();
    };
  }, []);

  return { quotes, connected, live };
}
