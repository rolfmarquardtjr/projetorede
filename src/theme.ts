import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#03045e',
      light: '#0a0f8f',
      dark: '#020347',
      contrastText: '#fff',
    },
    secondary: {
      main: '#023e8a',
      light: '#0353a4',
      dark: '#012a5e',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#1A2027',
      secondary: '#4B5563',
    },
    success: {
      main: '#023e8a',
      light: '#0353a4',
      dark: '#012a5e',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
      contrastText: '#FFFFFF',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
      color: '#1A2027',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.00833em',
      color: '#1A2027',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '0em',
      color: '#1A2027',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1A2027',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#1A2027',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#1A2027',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
      color: '#4B5563',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
      color: '#4B5563',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
      color: '#1A2027',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
      color: '#4B5563',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02857em',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
      color: '#6B7280',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 8px 16px rgba(0, 0, 0, 0.05)',
    '0px 12px 24px rgba(0, 0, 0, 0.05)',
    '0px 16px 32px rgba(0, 0, 0, 0.05)',
    '0px 20px 40px rgba(0, 0, 0, 0.05)',
    '0px 24px 48px rgba(0, 0, 0, 0.05)',
    '0px 28px 56px rgba(0, 0, 0, 0.05)',
    '0px 32px 64px rgba(0, 0, 0, 0.05)',
    '0px 36px 72px rgba(0, 0, 0, 0.05)',
    '0px 40px 80px rgba(0, 0, 0, 0.05)',
    '0px 44px 88px rgba(0, 0, 0, 0.05)',
    '0px 48px 96px rgba(0, 0, 0, 0.05)',
    '0px 52px 104px rgba(0, 0, 0, 0.05)',
    '0px 56px 112px rgba(0, 0, 0, 0.05)',
    '0px 60px 120px rgba(0, 0, 0, 0.05)',
    '0px 64px 128px rgba(0, 0, 0, 0.05)',
    '0px 68px 136px rgba(0, 0, 0, 0.05)',
    '0px 72px 144px rgba(0, 0, 0, 0.05)',
    '0px 76px 152px rgba(0, 0, 0, 0.05)',
    '0px 80px 160px rgba(0, 0, 0, 0.05)',
    '0px 84px 168px rgba(0, 0, 0, 0.05)',
    '0px 88px 176px rgba(0, 0, 0, 0.05)',
    '0px 92px 184px rgba(0, 0, 0, 0.05)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(0, 109, 59, 0.04)',
          },
        },
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0, 109, 59, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.08)',
          },
          border: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#FFFFFF',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006D3B',
              borderWidth: 2,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#006D3B',
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#F8F9FA',
          color: '#1A2027',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          '&.MuiChip-colorPrimary': {
            backgroundColor: 'rgba(0, 109, 59, 0.08)',
            color: '#006D3B',
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: 'rgba(251, 140, 0, 0.08)',
            color: '#FB8C00',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(0, 109, 59, 0.08)',
          height: 8,
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '1px solid',
        },
        standardSuccess: {
          backgroundColor: 'rgba(46, 125, 50, 0.08)',
          borderColor: 'rgba(46, 125, 50, 0.2)',
        },
        standardError: {
          backgroundColor: 'rgba(211, 47, 47, 0.08)',
          borderColor: 'rgba(211, 47, 47, 0.2)',
        },
        standardWarning: {
          backgroundColor: 'rgba(237, 108, 2, 0.08)',
          borderColor: 'rgba(237, 108, 2, 0.2)',
        },
        standardInfo: {
          backgroundColor: 'rgba(2, 136, 209, 0.08)',
          borderColor: 'rgba(2, 136, 209, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme; 