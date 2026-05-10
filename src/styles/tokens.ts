// ─── Primitive tokens ─────────────────────────────────────────────────────────

export const color = {
  neutral: {
    100: "#f4f4f4",
    200: "#e4e4e4",
    300: "#d4d4db",
    400: "#9f9fa6",
    500: "#71717e",
    600: "#52525e",
    700: "#3f3f45",
    800: "#27272c",
    900: "#18181d",
  },
  red: {
    100: "#fee3e2",
    200: "#fec9c9",
    300: "#ffa2a2",
    400: "#ff6467",
    500: "#fc2935",
    600: "#e80009",
    700: "#c20005",
    800: "#a00210",
    900: "#82191a",
  },
  green: {
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#61e9b5",
    400: "#00d492",
    500: "#00bc7c",
    600: "#149867",
    700: "#007a55",
    800: "#006045",
    900: "#00503b",
  },
  yellow: {
    100: "#fef3c5",
    200: "#fee685",
    300: "#ffd22d",
    400: "#ffb909",
    500: "#fd9b10",
    600: "#e27100",
    700: "#bc4c00",
    800: "#943e08",
    900: "#793308",
  },
  blue: {
    100: "#dceafd",
    200: "#bddbff",
    300: "#8ec5ff",
    400: "#4fa2ff",
    500: "#297fff",
    600: "#125cfe",
    700: "#1548e4",
    800: "#193cb9",
    900: "#1b3890",
  },
  white: "#f4f4f4",
  black: "#18181d",
} as const;

// ─── Semantic tokens ──────────────────────────────────────────────────────────

export const semantic = {
  color: {
    background: {
      default: color.neutral[100],
      accent: color.blue[600],
      accentHover: color.blue[700],
      accentPressed: color.blue[800],
      hover: color.neutral[200],
      pressed: color.neutral[300],
      danger: color.red[100],
      success: color.green[100],
      warning: color.yellow[100],
    },
    border: {
      default: color.neutral[400],
      secondary: color.neutral[300],
      accent: color.blue[500],
      danger: color.red[200],
      success: color.green[200],
      warning: color.yellow[200],
    },
    content: {
      default: color.neutral[900],
      secondary: color.neutral[700],
      accent: color.blue[700],
      onAccent: color.white,
      onDanger: color.red[900],
      onSuccess: color.green[900],
      onWarning: color.yellow[900],
    },
  },
} as const;

// ─── Typography ───────────────────────────────────────────────────────────────

export const fontFamily = "Outfit, sans-serif";

export const fontSize = {
  100: "0.875rem",
  200: "1rem",
  300: "1.25rem",
  400: "1.5rem",
  500: "2rem",
} as const;

export const fontWeight = {
  regular: 400,
  bold: 700,
} as const;

// ─── Spacing & sizing ─────────────────────────────────────────────────────────

export const space = {
  100: "0.25rem",
  200: "0.5rem",
  300: "0.75rem",
  400: "1rem",
  500: "1.5rem",
  600: "2rem",
  700: "3rem",
  800: "4rem",
  900: "6rem",
} as const;

export const size = {
  small: "1.75rem",
  medium: "2.25rem",
  large: "2.75rem",
} as const;

export const radius = {
  small: 4,
  medium: 8,
  large: 16,
  max: 999,
} as const;
