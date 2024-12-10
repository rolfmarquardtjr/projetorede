import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  styled,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Lock,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import GovBrLogo from '../images/gov.br-logo.png';
import entradaImg from '../images/entrada_correta.png';

const LoginContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  padding: theme.spacing(3),
}));

const LoginCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 1000,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const LoginForm = styled(CardContent)(({ theme }) => ({
  flex: '1 1 50%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const LoginImage = styled(Paper)(({ theme }) => ({
  flex: '1 1 50%',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: 200,
  },
}));

const LogoContainer = styled(Box)({
  marginBottom: '2rem',
  textAlign: 'center',
  '& img': {
    height: '80px',
    marginBottom: '1rem',
    objectFit: 'contain',
  },
});

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cpf === '123.456.789-00' && password === 'senha123') {
      localStorage.setItem('vida-cidada-token', 'mock-token');
      localStorage.setItem('user-name', 'João da Silva');
      toast.success('Login realizado com sucesso!');
      navigate('/facial-recognition');
    } else {
      toast.error('CPF ou senha inválidos');
    }
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  return (
    <LoginContainer maxWidth={false}>
      <LoginCard elevation={isMobile ? 0 : 8}>
        <LoginForm>
          <LogoContainer>
            <img src={GovBrLogo} alt="Gov.br" />
            <Typography variant="subtitle1" color="textSecondary">
              Acesse sua conta gov.br
            </Typography>
          </LogoContainer>

          <form onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(formatCPF(e.target.value))}
              placeholder="000.000.000-00"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Entrar com gov.br
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Não tem uma conta?
            </Typography>
            <Button color="primary" variant="text">
              Criar conta gov.br
            </Button>
          </Box>
        </LoginForm>

        <LoginImage>
          <img 
            src={entradaImg} 
            alt="Bem-vindo ao Vida Cidadã" 
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }} 
          />
        </LoginImage>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 