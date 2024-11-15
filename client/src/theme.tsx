import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral?: { dark: string; main: string; light: string }
  }
}

export const shades = {
  primary: {
    //black
    100: '#cccccc',
    200: '#999999',
    300: '#666666',
    400: '#333333',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  },

  secondary: {
    //red
    100: '#f7ccd2',
    200: '#ef99a4',
    300: '#e66677',
    400: '#de3349',
    500: '#d6001c',
    600: '#ab0016',
    700: '#800011',
    800: '#56000b',
    900: '#2b0006',
  },

  neutral: {
    // yellow
    100: '#f5f5f5',
    200: '#ecebec',
    300: '#e2e1e2',
    400: '#d9d7d9',
    500: '#cfcdcf',
    600: '#a6a4a6',
    700: '#7c7b7c',
    800: '#535253',
    900: '#292929',
  },
}

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ['Fauna One', 'sand-serif'].join(','),
    fontSize: 11,
    h1: {
      fontFamily: ['Cinzel', 'sand-serif'].join(','),
      fontSize: 48,
    },
    h2: {
      fontFamily: ['Cinzel', 'sand-serif'].join(','),
      fontSize: 36,
    },
    h3: {
      fontFamily: ['Cinzel', 'sand-serif'].join(','),
      fontSize: 20,
    },
    h4: {
      fontFamily: ['Cinzel', 'sand-serif'].join(','),
      fontSize: 14,
    },
  },
})