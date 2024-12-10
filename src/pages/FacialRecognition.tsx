import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  styled,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  Face as FaceIcon,
  CheckCircle as CheckCircleIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PageContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  padding: theme.spacing(3),
}));

const MainCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 1200,
  overflow: 'visible',
  padding: theme.spacing(4),
}));

const WebcamContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  marginTop: theme.spacing(4),
  '& video': {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const FacialOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  height: '280px',
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  pointerEvents: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    border: `2px dashed ${theme.palette.primary.light}`,
    borderRadius: '50%',
    animation: 'rotate 10s linear infinite',
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

const InstructionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const steps = ['Posicione seu rosto', 'Mantenha-se centralizado', 'Verificação concluída'];

const FacialRecognition = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const webcamRef = useRef<Webcam>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleCapture = async () => {
    setIsVerifying(true);
    setActiveStep(1);
    
    setTimeout(() => {
      setActiveStep(2);
      setIsVerifying(false);
      toast.success('Reconhecimento facial realizado com sucesso!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    }, 3000);
  };

  const instructions = [
    {
      icon: <FaceIcon color="primary" />,
      text: 'Posicione seu rosto dentro do círculo',
    },
    {
      icon: <CameraIcon color="primary" />,
      text: 'Mantenha uma boa iluminação',
    },
    {
      icon: <CheckCircleIcon color="primary" />,
      text: 'Não use óculos escuros ou acessórios que cubram o rosto',
    },
  ];

  return (
    <PageContainer maxWidth={false}>
      <MainCard elevation={isMobile ? 0 : 8}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight="bold">
            Verificação Facial
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Vamos confirmar sua identidade para prosseguir
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <WebcamContainer>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            mirrored
          />
          <FacialOverlay />
        </WebcamContainer>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={isVerifying ? <CircularProgress size={24} color="inherit" /> : <CameraIcon />}
            onClick={handleCapture}
            disabled={isVerifying}
            sx={{ px: 6, py: 1.5 }}
          >
            {isVerifying ? 'Verificando...' : 'Iniciar Verificação'}
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          {instructions.map((instruction, index) => (
            <InstructionCard key={index} elevation={0}>
              {instruction.icon}
              <Typography variant="body1" color="textSecondary" sx={{ flex: 1 }}>
                {instruction.text}
              </Typography>
              <IconButton size="small" color="primary">
                <HelpIcon />
              </IconButton>
            </InstructionCard>
          ))}
        </Box>
      </MainCard>
    </PageContainer>
  );
};

export default FacialRecognition; 