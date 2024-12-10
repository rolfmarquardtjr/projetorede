import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  styled,
  Grid,
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Tooltip,
  TooltipProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  DialogActions,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  Help as HelpIcon,
  Timer as TimeIcon,
  Speed as SpeedIcon,
  Close as CloseIcon,
  QrCode2 as QrCodeIcon,
  DirectionsCar as CarIcon,
  Traffic as TrafficIcon,
  NightsStay as NightIcon,
  Visibility as VisibilityIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #03045e 0%, #023e8a 100%)',
  color: 'white',
  marginBottom: theme.spacing(4),
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(3, 4, 94, 0.15)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
  }
}));

const ProgressBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ProgressStats = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(3),
}));

const StatItem = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  textTransform: 'none',
  fontSize: '1.1rem',
}));

const ModuleCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  border: '1px solid rgba(3, 4, 94, 0.2)',
  backgroundColor: 'rgba(3, 4, 94, 0.02)',
  borderRadius: 16,
}));

const QRDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 24,
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

const QRContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  backgroundColor: 'rgba(0, 109, 59, 0.05)',
  borderRadius: 16,
  gap: theme.spacing(2),
}));

const AnimatedQRIcon = styled(QrCodeIcon)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.primary.main,
  animation: 'pulse 2s infinite',
}));

const ResultDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 24,
    padding: theme.spacing(2),
    maxWidth: '90vw',
    maxHeight: '90vh',
  },
}));

const StatChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(3, 4, 94, 0.08)',
  borderRadius: 12,
  padding: theme.spacing(1),
  '& .MuiChip-label': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
}));

const AccessibilityTooltip = styled(
  ({ className, children, title, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} title={title}>
      {children}
    </Tooltip>
  )
)(({ theme }) => ({
  '& .MuiTooltip-tooltip': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[1],
    padding: theme.spacing(2),
    fontSize: '0.9rem',
    maxWidth: 300,
  },
}));

const HelpButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  zIndex: 1000,
}));

interface SimulatorModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  requirements: string[];
  completed: boolean;
  current?: boolean;
  result?: string;
}

const SIMULATOR_MODULES: SimulatorModule[] = [
  {
    id: 1,
    title: 'Módulo 1 - Básico',
    description: 'Familiarização com o veículo e comandos básicos',
    duration: '50 minutos',
    requirements: ['Posição de dirigir', 'Regulagem de equipamentos', 'Comandos do veículo'],
    completed: true,
    result: 'https://exemplo.com/resultado-modulo1.pdf',
  },
  {
    id: 2,
    title: 'Módulo 2 - Controle',
    description: 'Controle básico do veículo e direção defensiva',
    duration: '50 minutos',
    requirements: ['Embreagem e câmbio', 'Frenagem', 'Direção defensiva básica'],
    completed: true,
    result: 'https://exemplo.com/resultado-modulo2.pdf',
  },
  {
    id: 3,
    title: 'Módulo 3 - Tráfego',
    description: 'Direção em condições de tráfego',
    duration: '50 minutos',
    requirements: ['Direção no trânsito', 'Observação das normas', 'Sinalização'],
    completed: false,
    current: true,
  },
  {
    id: 4,
    title: 'Módulo 4 - Noturno',
    description: 'Direção em condições noturnas',
    duration: '50 minutos',
    requirements: ['Direção noturna', 'Uso de faróis', 'Situações de baixa visibilidade'],
    completed: false,
    result: 'https://exemplo.com/resultado-modulo4.pdf',
  },
  {
    id: 5,
    title: 'Módulo 5 - Avançado',
    description: 'Situações adversas e manobras complexas',
    duration: '50 minutos',
    requirements: ['Situações de risco', 'Manobras especiais', 'Condições adversas'],
    completed: false,
    result: 'https://exemplo.com/resultado-modulo5.pdf',
  },
];

const LastLesson = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<SimulatorModule | null>(null);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const currentModule = SIMULATOR_MODULES.find(module => module.current) || SIMULATOR_MODULES[0];
  const progress = (SIMULATOR_MODULES.filter(module => module.completed).length / SIMULATOR_MODULES.length) * 100;

  const handleStartModule = (module: SimulatorModule) => {
    setSelectedModule(module);
    setLoading(true);
    setQrDialogOpen(true);
    // Simulando detecção do QR Code
    setTimeout(() => {
      setLoading(false);
      toast.success(`${module.title} iniciado com sucesso!`);
      setQrDialogOpen(false);
      // Aqui você redirecionaria para a interface do simulador
    }, 3000);
  };

  const handleViewResult = (module: SimulatorModule) => {
    setSelectedModule(module);
    setResultDialogOpen(true);
  };

  // Função para lidar com navegação por teclado
  const handleKeyNavigation = (event: React.KeyboardEvent, moduleId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const module = SIMULATOR_MODULES.find(m => m.id === moduleId);
      if (module) handleStartModule(module);
    }
  };

  // Tutorial steps
  const tutorialSteps = [
    {
      target: '.module-card',
      content: 'Aqui você encontra os módulos do simulador. Cada módulo tem um tema específico para sua prática.',
      placement: 'top',
    },
    {
      target: '.progress-section',
      content: 'Acompanhe seu progresso geral e veja quanto falta para completar o curso.',
      placement: 'bottom',
    },
    {
      target: '.action-buttons',
      content: 'Use estes botões para iniciar uma aula ou ver resultados anteriores.',
      placement: 'left',
    },
  ];

  return (
    <PageContainer maxWidth="lg">
      <Box 
        display="flex" 
        alignItems="center" 
        gap={2} 
        mb={4}
        component="nav" 
        aria-label="Navegação principal"
      >
        <AccessibilityTooltip title="Voltar para o Dashboard">
          <IconButton
            onClick={() => navigate('/dashboard')}
            aria-label="Voltar para o Dashboard"
            sx={{
              backgroundColor: 'rgba(3, 4, 94, 0.08)',
              '&:hover': {
                backgroundColor: 'rgba(3, 4, 94, 0.12)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </AccessibilityTooltip>
        <Typography variant="h4" component="h1">
          Aulas de Simulador
        </Typography>
        <AccessibilityTooltip title="Clique aqui para ver um tutorial de como usar esta página">
          <IconButton
            onClick={() => setShowTutorial(true)}
            aria-label="Mostrar tutorial"
            size="small"
          >
            <HelpIcon />
          </IconButton>
        </AccessibilityTooltip>
      </Box>

      <ProgressCard 
        elevation={3}
        className="progress-section"
        role="region"
        aria-label="Progresso geral no simulador"
      >
        <ProgressBox>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <CarIcon sx={{ fontSize: 30, color: 'white' }} />
            </Avatar>
            <Box>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="white">
                Progresso no Simulador
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {currentModule.title}
              </Typography>
            </Box>
          </Box>

          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Progresso Total
              </Typography>
              <Typography variant="body2" fontWeight="bold" color="white">
                {Math.round(progress)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'white',
                }
              }}
            />
          </Box>

          <ProgressStats>
            <StatItem>
              <TimeIcon sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Tempo Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="white">
                  5 horas
                </Typography>
              </Box>
            </StatItem>
            <StatItem>
              <CheckIcon sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Módulos Concluídos
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="white">
                  {SIMULATOR_MODULES.filter(m => m.completed).length}/{SIMULATOR_MODULES.length}
                </Typography>
              </Box>
            </StatItem>
            <StatItem>
              <SpeedIcon sx={{ fontSize: 24, color: 'rgba(255, 255, 255, 0.9)' }} />
              <Box>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Próxima Aula
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="white">
                  {currentModule.duration}
                </Typography>
              </Box>
            </StatItem>
          </ProgressStats>
        </ProgressBox>
      </ProgressCard>

      <Grid container spacing={3}>
        {SIMULATOR_MODULES.map((module) => (
          <Grid item xs={12} key={module.id}>
            <ModuleCard
              className="module-card"
              role="article"
              aria-label={`Módulo ${module.title}`}
              tabIndex={0}
              onKeyDown={(e) => handleKeyNavigation(e, module.id)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={3}>
                  <Avatar
                    sx={{
                      bgcolor: module.completed
                        ? 'success.main'
                        : module.current
                        ? 'primary.main'
                        : 'grey.400',
                    }}
                    aria-label={module.completed ? 'Módulo concluído' : module.current ? 'Módulo atual' : 'Módulo pendente'}
                  >
                    {module.completed ? <CheckIcon /> : <MenuBookIcon />}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6">{module.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {module.description}
                    </Typography>
                  </Box>
                  <AccessibilityTooltip 
                    title={`Status: ${module.completed ? 'Concluído' : module.current ? 'Em Andamento' : 'Pendente'}`}
                  >
                    <Chip
                      label={module.completed ? 'Concluído' : module.current ? 'Em Andamento' : 'Pendente'}
                      color={module.completed ? 'success' : module.current ? 'primary' : 'default'}
                      variant={module.completed || module.current ? 'filled' : 'outlined'}
                    />
                  </AccessibilityTooltip>
                </Box>

                <Box className="action-buttons" display="flex" justifyContent="space-between" alignItems="center">
                  <Box display="flex" gap={1}>
                    {module.requirements.map((req, index) => (
                      <AccessibilityTooltip 
                        key={index}
                        title={`Requisito: ${req}`}
                      >
                        <Chip
                          label={req}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      </AccessibilityTooltip>
                    ))}
                  </Box>
                  <Box display="flex" gap={2}>
                    <AccessibilityTooltip title={`Duração: ${module.duration}`}>
                      <Chip
                        icon={<TimeIcon />}
                        label={module.duration}
                        variant="outlined"
                      />
                    </AccessibilityTooltip>
                    <Button
                      variant={module.completed ? "outlined" : "contained"}
                      color="primary"
                      startIcon={module.completed ? <AssignmentIcon /> : <PlayArrowIcon />}
                      onClick={() => handleStartModule(module)}
                      disabled={(!module.current && !module.completed) || loading}
                      aria-label={`${module.completed ? 'Ver conteúdo do' : 'Iniciar'} módulo ${module.title}`}
                    >
                      {loading ? 'Carregando...' : module.completed ? 'Ver Conteúdo' : 'Iniciar Aula'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </ModuleCard>
          </Grid>
        ))}
      </Grid>

      {/* Botão de ajuda flutuante */}
      <HelpButton
        onClick={() => setHelpDialogOpen(true)}
        aria-label="Abrir ajuda"
      >
        <HelpIcon />
      </HelpButton>

      {/* Dialog de ajuda */}
      <Dialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        aria-labelledby="help-dialog-title"
      >
        <DialogTitle id="help-dialog-title">Como usar esta página</DialogTitle>
        <DialogContent>
          <Typography paragraph>
            Esta página mostra todos os módulos disponíveis no simulador. Aqui você pode:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><PlayArrowIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Iniciar uma aula"
                secondary="Clique no botão 'Iniciar Aula' em qualquer módulo disponível"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><AssignmentIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Ver conteúdo concluído"
                secondary="Acesse o conteúdo dos módulos que você já completou"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><TimeIcon color="primary" /></ListItemIcon>
              <ListItemText 
                primary="Acompanhar progresso"
                secondary="Veja seu progresso geral e o tempo restante no topo da página"
              />
            </ListItem>
          </List>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
            Dica: Você pode usar as teclas Tab e Enter para navegar entre os módulos usando apenas o teclado.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTutorial(true)} color="primary">
            Iniciar Tutorial
          </Button>
          <Button onClick={() => setHelpDialogOpen(false)} color="primary">
            Entendi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tutorial */}
      {showTutorial && (
        <TutorialDialog
          steps={tutorialSteps}
          open={showTutorial}
          onClose={() => setShowTutorial(false)}
        />
      )}

      <QRDialog
        open={qrDialogOpen}
        onClose={() => !loading && setQrDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <QrCodeIcon color="primary" />
            <Typography variant="h6">
              Escaneie o QR Code do Simulador
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <QRContainer>
            {loading ? (
              <>
                <CircularProgress size={80} color="primary" />
                <Typography variant="h6" color="primary" align="center">
                  Conectando ao simulador...
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  Mantenha o QR Code enquadrado na câmera
                </Typography>
              </>
            ) : (
              <>
                <AnimatedQRIcon />
                <Typography variant="h6" color="primary" align="center">
                  Aguardando leitura do QR Code
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  Aponte a câmera para o QR Code exibido na tela do simulador para iniciar o {selectedModule?.title}
                </Typography>
              </>
            )}
            <Box mt={2}>
              <Chip
                icon={<TimeIcon />}
                label="Duração estimada: 50 minutos"
                color="primary"
                variant="outlined"
              />
            </Box>
          </QRContainer>
          <Box mt={3}>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Instruções:
            </Typography>
            <Typography variant="body2" color="textSecondary">
              1. Verifique se o simulador está ligado e na tela inicial<br />
              2. Localize o QR Code na tela do simulador<br />
              3. Aponte a câmera do seu celular para o QR Code<br />
              4. Aguarde a conexão ser estabelecida<br />
              5. O módulo iniciará automaticamente após a leitura
            </Typography>
          </Box>
        </DialogContent>
      </QRDialog>

      <ResultDialog
        open={resultDialogOpen}
        onClose={() => setResultDialogOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <AssessmentIcon color="primary" />
              <Typography variant="h6">
                Resultado: {selectedModule?.title}
              </Typography>
            </Box>
            <IconButton onClick={() => setResultDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ height: '80vh', width: '100%' }}>
            {selectedModule?.result && (
              <iframe
                src={selectedModule.result}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                }}
                title={`Resultado ${selectedModule.title}`}
              />
            )}
          </Box>
        </DialogContent>
      </ResultDialog>
    </PageContainer>
  );
};

interface TutorialStep {
  target: string;
  content: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialDialogProps {
  steps: TutorialStep[];
  open: boolean;
  onClose: () => void;
}

const TutorialDialog: React.FC<TutorialDialogProps> = ({ steps, open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="tutorial-dialog-title"
    >
      <DialogTitle id="tutorial-dialog-title">
        Tutorial - Passo {activeStep + 1} de {steps.length}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: 300 }}>
          <Typography paragraph>
            {steps[activeStep].content}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={activeStep === steps.length - 1 ? handleClose : handleNext}
          variant="contained"
          color="primary"
        >
          {activeStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LastLesson; 