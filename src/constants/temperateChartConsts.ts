export const TEMPERATURE_CHART_CONSTANTS = {
  CHART_TYPE: "line",
  DEVICE_NAMES: {
    DEVICE_225: "Device 25_225",
    DEVICE_226: "Device 25_226",
  },
  COLORS: {
    DEVICE_225: "#1890ff",
    DEVICE_226: "#ff4500",
    TEXT: "#666",
    GRID: "#eee",
    AXIS: "#ddd",
    TOOLTIP_BG: "rgba(255, 255, 255, 0.9)",
    TOOLTIP_SHADOW: "rgba(0, 0, 0, 0.1)",
    TOOLTIP_TEXT: "#333",
  },
  LAYOUT: {
    TITLE: {
      POSITION: "center",
      FONT_SIZE: 16,
      FONT_WEIGHT: "normal",
      TEXT: "Temperature Trends",
      TOP: 0,
    },
    LEGEND: {
      TOP: "8%",
      RIGHT: "10%",
      FONT_SIZE: 12,
      ITEM_WIDTH: 15,
      ITEM_HEIGHT: 3,
    },
    GRID: {
      LEFT: "10%",
      RIGHT: "5%",
      BOTTOM: "15%",
      TOP: "15%",
      HEIGHT: "75%",
    },
  },
  LINE_STYLE: {
    SYMBOL: "circle",
    SYMBOL_SIZE: 6,
    LINE_WIDTH: 2,
    LINE_TYPE: "solid" as const,
    SMOOTH: true,
  },
  TOOLTIP: {
    TRIGGER: "axis",
    SHADOW_BLUR: 10,
    BORDER_WIDTH: 0,
    DOT_SIZE: 10,
    DOT_MARGIN_RIGHT: 5,
  },
  XAXIS: {
    TYPE: "category",
    XAXIS_LABEL: {
      INTERVAL: "auto",
      ALIGN_WITH_LABEL: true,
    },
    XAXIS_TICK: {
      ALIGN_WITH_LABEL: true,
      INTERVAL: "auto",
    },
  },
  YAXIS: {
    TYPE: "value",
    SPLIT_NUMBER: 8,
    YAXIS_LABEL: {
      INTERVAL: "auto",
      ALIGN_WITH_LABEL: true,
    },
    YAXIS_SPLIT_LINE: {
      SHOW: true,
      LINE_STYLE: {
        COLOR: "#eee",
        TYPE: "dashed",
      },
    },
  },
} as const;
