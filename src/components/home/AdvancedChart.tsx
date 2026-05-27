"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SectionHeader } from "@/components/shared/SectionHeader";

const CHART_HEIGHT = 610;

export function AdvancedChart() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!container.current || !resolvedTheme) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: CHART_HEIGHT,
      symbol: "BSE:SENSEX",
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: resolvedTheme === "dark" ? "dark" : "light",
      style: "1",
      locale: "in",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    container.current.appendChild(script);
  }, [resolvedTheme]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <SectionHeader
          eyebrow="Live Markets"
          title="Market"
          titleHighlight="Overview"
          description="Track real-time price action on SENSEX and other key Indian indices."
        />
        <div
          ref={container}
          className="tradingview-widget-container w-full rounded-xl overflow-hidden border border-border"
          style={{ height: `${CHART_HEIGHT}px` }}
          suppressHydrationWarning
        />
      </div>
    </section>
  );
}
