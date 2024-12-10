 import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/images/logo-removebg-preview.png';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  styled,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  School as SchoolIcon,
  DirectionsCar as CarIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  LocalLibrary as LibraryIcon,
  EmojiEvents as TrophyIcon,
  Assignment as AssignmentIcon,
  PlayCircle as PlayIcon,
  Help as HelpIcon,
  CalendarMonth as CalendarIcon,
  MenuBook as MenuBookIcon,
  Timer as TimeIcon,
  PlayArrow as PlayArrowIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const WelcomeCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(4),
}));

const ProgressCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  overflow: 'visible',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: theme.palette.primary.main,
    borderRadius: '4px 4px 0 0',
  },
}));

const StyledTimelineItem = styled(TimelineItem)(({ theme }) => ({
  '&:before': {
    display: 'none',
  },
}));

const AchievementCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${theme.palette.background.paper})`,
  },
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: 16,
  '& .MuiTypography-root': {
    color: '#FFFFFF',
  },
  '& .MuiSvgIcon-root': {
    color: '#FFFFFF',
    fontSize: '2rem',
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
  },
}));

const AchievementAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
  '& .MuiSvgIcon-root': {
    fontSize: '1.75rem',
    filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
  },
}));

const ProgressSection = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 24,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  background: '#fff',
  marginBottom: theme.spacing(4),
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 12,
  borderRadius: 6,
  backgroundColor: 'rgba(3, 4, 94, 0.08)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 6,
  },
  marginBottom: theme.spacing(1),
}));

const ProgressIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  borderRadius: 16,
  backgroundColor: 'rgba(3, 4, 94, 0.02)',
  border: '1px solid rgba(3, 4, 94, 0.08)',
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [progress, setProgress] = useState({
    teoricas: 30,
    simulador: 4,
  });

  const [achievements, setAchievements] = useState([
    {
      title: 'Primeira Aula Concluída',
      description: 'Você completou sua primeira aula teórica!',
      icon: <SchoolIcon />,
      unlocked: true,
    },
    {
      title: 'Dedicação aos Estudos',
      description: '10 horas de aulas teóricas concluídas',
      icon: <LibraryIcon />,
      unlocked: true,
    },
    {
      title: 'Mestre do Simulador',
      description: 'Completou 5 horas no simulador',
      icon: <TrophyIcon />,
      unlocked: false,
    },
  ]);

  useEffect(() => {
    // Simulando dados do progresso
    const mockProgress = {
      teoricas: 30,
      simulador: 4,
    };
    setProgress(mockProgress);
  }, []);

  const nextClasses = [
    {
      title: 'Legislação de Trânsito',
      date: 'Hoje, 14:00',
      status: 'pendente',
      type: 'teoria',
      description: 'Capítulo 3 - Normas de Circulação',
    },
    {
      title: 'Direção Defensiva',
      date: 'Amanhã, 15:30',
      status: 'pendente',
      type: 'teoria',
      description: 'Módulo 2 - Prevenção de Acidentes',
    },
    {
      title: 'Simulador - Prática Básica',
      date: 'Quinta, 10:00',
      status: 'agendado',
      type: 'simulador',
      description: 'Introdução aos comandos básicos',
    },
  ];

  const stats = [
    {
      title: 'Aulas Concluídas',
      value: '12/74',
      icon: <CheckCircleIcon sx={{ color: '#4ADE80' }} />,
    },
    {
      title: 'Horas no Simulador',
      value: '4/16',
      icon: <CarIcon sx={{ color: '#60A5FA' }} />,
    },
    {
      title: 'Média de Notas',
      value: '8.5',
      icon: <TrophyIcon sx={{ color: '#FBBF24' }} />,
    },
  ];

  return (
    <DashboardContainer maxWidth="lg">
      <WelcomeCard elevation={3}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mb={3}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: '#FFFFFF' }}>
                Olá, {localStorage.getItem('user-name')}!
              </Typography>
              <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>
                Bem-vindo ao Vida Cidadã
              </Typography>
            </Box>
            <img src={logo} alt="Vida Cidadã Logo" style={{ height: 80 }} />
          </Box>
          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StatsCard elevation={0}>
                  <Box display="flex" alignItems="center" gap={2}>
                    {stat.icon}
                    <Box>
                      <Typography variant="h6" sx={{ color: '#FFFFFF !important' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#FFFFFF !important' }}>
                        {stat.title}
                      </Typography>
                    </Box>
                  </Box>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </WelcomeCard>

      <Grid container spacing={4}>
        {/* Progresso Geral */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" gutterBottom>
                  Seu Progresso
                </Typography>
                <Tooltip title="Acompanhe aqui seu progresso nas aulas teóricas e práticas">
                  <IconButton size="small">
                    <HelpIcon sx={{ color: '#03045e' }} />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <ProgressIndicator>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: '1.75rem' }} />
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="500">
                        Aulas Teóricas
                      </Typography>
                      <Typography variant="subtitle1" color="primary" fontWeight="600">
                        {progress.teoricas}/74 horas
                      </Typography>
                    </Box>
                    <ProgressBar
                      variant="determinate"
                      value={(progress.teoricas / 74) * 100}
                    />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body2" color="textSecondary">
                        {Math.round((progress.teoricas / 74) * 100)}% concluído
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {74 - progress.teoricas} horas restantes
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1} mt={2}>
                      <Chip
                        size="small"
                        icon={<CheckCircleIcon />}
                        label="12 aulas concluídas"
                        color="success"
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        icon={<TimeIcon />}
                        label="Próxima aula: Hoje, 14:00"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </ProgressIndicator>

                <ProgressIndicator>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <CarIcon sx={{ fontSize: '1.75rem' }} />
                  </Avatar>
                  <Box flex={1}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="500">
                        Aulas de Simulador
                      </Typography>
                      <Typography variant="subtitle1" color="primary" fontWeight="600">
                        {progress.simulador}/16 horas
                      </Typography>
                    </Box>
                    <ProgressBar
                      variant="determinate"
                      value={(progress.simulador / 16) * 100}
                    />
                    <Box display="flex" justifyContent="space-between" mt={1}>
                      <Typography variant="body2" color="textSecondary">
                        {Math.round((progress.simulador / 16) * 100)}% concluído
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {16 - progress.simulador} horas restantes
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1} mt={2}>
                      <Chip
                        size="small"
                        icon={<CheckCircleIcon />}
                        label="2 módulos concluídos"
                        color="success"
                        variant="outlined"
                      />
                      <Chip
                        size="small"
                        icon={<TimeIcon />}
                        label="Próxima aula: Quinta, 10:00"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                </ProgressIndicator>

                <Box mt={3} display="flex" gap={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => navigate('/theoretical-lessons')}
                  >
                    Continuar Aulas Teóricas
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<CarIcon />}
                    onClick={() => navigate('/last-lesson')}
                  >
                    Continuar Simulador
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>

          {/* Conquistas */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1A2027' }}>
              Suas Conquistas
            </Typography>
            <Grid container spacing={2}>
              {achievements.map((achievement, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <StyledCard>
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          opacity: achievement.unlocked ? 1 : 0.5,
                        }}
                      >
                        <AchievementAvatar
                          sx={{
                            bgcolor: achievement.unlocked
                              ? 'primary.main'
                              : 'grey.300',
                          }}
                        >
                          {achievement.icon}
                        </AchievementAvatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ color: '#1A2027' }}>
                            {achievement.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#4B5563' }}>
                            {achievement.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Próximas Aulas e Ações */}
        <Grid item xs={12} md={4}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6">
                  Ações Rápidas
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<ScheduleIcon />}
                    onClick={() => navigate('/schedule-simulator')}
                    sx={{ borderRadius: 3 }}
                  >
                    Agendar Simulador
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<MenuBookIcon />}
                    onClick={() => navigate('/theoretical-lessons')}
                    sx={{ borderRadius: 3 }}
                  >
                    Aulas Teóricas
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<PlayIcon />}
                    onClick={() => navigate('/last-lesson')}
                    sx={{ borderRadius: 3 }}
                  >
                    Aulas no Simulador
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    startIcon={<AssignmentIcon />}
                    sx={{ borderRadius: 3 }}
                  >
                    Fazer Simulado
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Próximas Aulas
              </Typography>
              <Timeline>
                {nextClasses.map((aula, index) => (
                  <StyledTimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot
                        color={aula.status === 'agendado' ? 'primary' : 'grey'}
                      >
                        {aula.type === 'simulador' ? <CarIcon /> : <SchoolIcon />}
                      </TimelineDot>
                      {index < nextClasses.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Box mb={2}>
                        <Typography variant="subtitle1">{aula.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {aula.description}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <CalendarIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {aula.date}
                          </Typography>
                        </Box>
                        <Box mt={1}>
                          <Chip
                            size="small"
                            label={aula.status === 'agendado' ? 'Agendado' : 'Pendente'}
                            color={aula.status === 'agendado' ? 'primary' : 'default'}
                          />
                        </Box>
                      </Box>
                    </TimelineContent>
                  </StyledTimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard; 