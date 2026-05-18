"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const SYMBOLS = [
  { proName: "BSE:SENSEX", description: "SENSEX" },
  { proName: "BSE-BANK", description: "BANKEX" },
  { proName: "NSE-NIFTY", description: "NIFTY 50" },
  { proName: "NSE-BANKNIFTY", description: "NIFTY BANK" },
  { proName: "NSE-CNXMIDCAP", description: "NIFTY MIDCAP 100" },
  { proName: "NSE:NSE-CNXSMALLCAP", description: "NIFTY SMALLCAP 100" },
  { proName: "MCX-GOLD1!", description: "GOLD" },
];

export function MarketTicker() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      colorTheme: resolvedTheme === "dark" ? "dark" : "light",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "in",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <div className="w-full border-y border-border bg-muted/30 overflow-hidden">
      <div ref={container} className="tradingview-widget-container" />
    </div>
  );
}
