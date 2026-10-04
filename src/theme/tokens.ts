export const colors = {
  bg: '#0A0D0B',
  road: '#121614',
  surface: '#141816',
  surfaceRaised: '#1A1F1C',
  border: '#252B28',
  borderGlow: '#3E9B58',
  green: '#72F28E',
  greenSoft: '#2F7A45',
  text: '#F2F5F3',
  textMuted: '#8F9893',
  textFaint: '#5F6963',
  red: '#F26B63',
  amber: '#F4C24F',
  track: '#2A302D',
} as const;

export const radius = { sm: 14, md: 18, lg: 26, pill: 999 } as const;
export const space = { xs: 6, sm: 10, md: 14, lg: 20, xl: 24 } as const;

// Tabular figures keep numbers from jittering while they count down.
export const numeric = { fontVariant: ['tabular-nums' as const] };