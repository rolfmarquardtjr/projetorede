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
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  School as SchoolIcon,
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckIcon,
  LibraryBooks as LibraryIcon,
  Assignment as AssignmentIcon,
  Timer as TimerIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ModuleCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: 16,
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  backgroundColor: 'rgba(3, 4, 94, 0.1)',
  '& .MuiLinearProgress-bar': {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Topic {
  id: number;
  title: string;
  content: string;
  duration: number; // em minutos
  completed: boolean;
}

interface TheoreticalModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  topics: string[];
  completed: boolean;
  current?: boolean;
  content?: string;
}

const THEORETICAL_MODULES: TheoreticalModule[] = [
  {
    id: 1,
    title: 'Legislação de Trânsito',
    description: 'Normas gerais de circulação e conduta',
    duration: '10 horas',
    progress: 80,
    topics: [
      'Leis de trânsito',
      'Infrações e penalidades',
      'Sinalização',
      'Documentação obrigatória'
    ],
    completed: true,
  },
  {
    id: 2,
    title: 'Direção Defensiva',
    description: 'Prevenção de acidentes e condução segura',
    duration: '12 horas',
    progress: 60,
    topics: [
      'Condições adversas',
      'Distância de segurança',
      'Prevenção de acidentes',
      'Situações de risco'
    ],
    current: true,
    completed: false,
  },
  {
    id: 3,
    title: 'Primeiros Socorros',
    description: 'Procedimentos emergenciais no trânsito',
    duration: '8 horas',
    progress: 0,
    topics: [
      'Sinalização do local',
      'Acionamento de socorro',
      'Verificação de vítimas',
      'Cuidados básicos'
    ],
    completed: false,
  },
  {
    id: 4,
    title: 'Mecânica Básica',
    description: 'Funcionamento e manutenção do veículo',
    duration: '8 horas',
    progress: 0,
    topics: [
      'Motor e sistemas',
      'Manutenção preventiva',
      'Pneus e suspensão',
      'Diagnóstico básico'
    ],
    completed: false,
  },
  {
    id: 5,
    title: 'Meio Ambiente e Cidadania',
    description: 'Impacto ambiental e responsabilidade social',
    duration: '6 horas',
    progress: 0,
    topics: [
      'Poluição veicular',
      'Condução econômica',
      'Descarte de resíduos',
      'Convívio social no trânsito'
    ],
    completed: false,
  },
];

const TheoreticalLessons = () => {
  const navigate = useNavigate();
  const [selectedModule, setSelectedModule] = useState<TheoreticalModule | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openContentModal, setOpenContentModal] = useState(false);

  const handleStartLesson = async (module: TheoreticalModule) => {
    if (module.completed) {
      setOpenContentModal(true);
      return;
    }

    setIsLoading(true);
    try {
      setSelectedModule(module);

      // Simula carregamento do conteúdo
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Em um cenário real, você faria uma chamada à API aqui
      // const response = await api.get(`/lessons/${module.id}`);
      
      toast.success(`Aula iniciada: ${module.title}`);
      
      // Aqui você redirecionaria para a página da aula específica
      // navigate(`/theoretical-lessons/${module.id}`);
      
      // Por enquanto, vamos apenas mostrar que está funcionando
      if (module.current) {
        toast.info('Continuando de onde você parou...');
      } else if (!module.completed) {
        toast.info('Nova aula iniciada!');
      } else {
        toast.info('Revisando conteúdo...');
      }

    } catch (error) {
      console.error('Error starting lesson:', error);
      toast.error('Erro ao iniciar a aula. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calcula o progresso total considerando o peso de cada módulo
  const totalProgress = THEORETICAL_MODULES.reduce((acc, module) => {
    const weight = parseInt(module.duration) / 44; // 44 é o total de horas
    return acc + (module.progress * weight);
  }, 0);

  const hoursRemaining = THEORETICAL_MODULES.reduce((acc, module) => {
    const totalHours = parseInt(module.duration);
    const completedHours = (totalHours * module.progress) / 100;
    return acc + (totalHours - completedHours);
  }, 0);

  const mockTheoricalContent = [
    {
      module: "Módulo 1 - Legislação de Trânsito",
      progress: 100,
      lessons: [
        { title: "Introdução ao Código de Trânsito Brasileiro", duration: "2h", completed: true },
        { title: "Normas de Circulação e Conduta", duration: "3h", completed: true },
        { title: "Infrações e Penalidades", duration: "2h", completed: true },
      ]
    },
    {
      module: "Módulo 2 - Direção Defensiva",
      progress: 75,
      lessons: [
        { title: "Conceitos Básicos de Direção Defensiva", duration: "2h", completed: true },
        { title: "Condições Adversas", duration: "2h", completed: true },
        { title: "Preven��ão de Acidentes", duration: "2h", completed: false },
      ]
    },
    {
      module: "Módulo 3 - Primeiros Socorros",
      progress: 0,
      lessons: [
        { title: "Noções Básicas de Primeiros Socorros", duration: "2h", completed: false },
        { title: "Procedimentos em Caso de Acidente", duration: "3h", completed: false },
        { title: "Kit de Primeiros Socorros", duration: "1h", completed: false },
      ]
    },
    {
      module: "Módulo 4 - Mecânica Básica",
      progress: 0,
      lessons: [
        { title: "Funcionamento do Veículo", duration: "2h", completed: false },
        { title: "Manutenção Preventiva", duration: "2h", completed: false },
        { title: "Resolução de Problemas Comuns", duration: "2h", completed: false },
      ]
    }
  ];

  return (
    <PageContainer maxWidth="lg">
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <IconButton
          onClick={() => navigate('/dashboard')}
          sx={{
            backgroundColor: 'rgba(3, 4, 94, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(3, 4, 94, 0.12)',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Aulas Teóricas
        </Typography>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={3} mb={3}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: 'primary.main',
              }}
            >
              <SchoolIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Progresso Geral
              </Typography>
              <Box mb={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Módulo Atual: {THEORETICAL_MODULES.find(m => m.current)?.title || 'Nenhum módulo em andamento'}
                </Typography>
                <Typography variant="body2" color="primary">
                  {THEORETICAL_MODULES.find(m => m.current)?.description}
                </Typography>
              </Box>
              <ProgressBar
                variant="determinate"
                value={totalProgress}
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="body2" color="textSecondary">
                  {Math.round(totalProgress)}% concluído
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {Math.round(hoursRemaining)} horas restantes
                </Typography>
              </Box>
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                <Chip
                  size="small"
                  icon={<CheckIcon />}
                  label={`${THEORETICAL_MODULES.filter(m => m.completed).length} módulos concluídos`}
                  color="success"
                  variant="outlined"
                />
                <Chip
                  size="small"
                  icon={<TimerIcon />}
                  label={`${THEORETICAL_MODULES.length - THEORETICAL_MODULES.filter(m => m.completed).length} módulos restantes`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {THEORETICAL_MODULES.map((module) => (
          <Grid item xs={12} key={module.id}>
            <ModuleCard>
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
                  >
                    {module.completed ? <CheckIcon /> : <LibraryIcon />}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="h6">{module.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {module.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={module.completed ? 'Concluído' : module.current ? 'Em Andamento' : 'Pendente'}
                    color={module.completed ? 'success' : module.current ? 'primary' : 'default'}
                    variant={module.completed || module.current ? 'filled' : 'outlined'}
                  />
                </Box>

                <ProgressBar
                  variant="determinate"
                  value={module.progress}
                  sx={{ mb: 2 }}
                />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {module.topics.map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                      <Chip
                        icon={<TimerIcon />}
                        label={module.duration}
                        variant="outlined"
                      />
                      <Button
                        variant={module.completed ? "outlined" : "contained"}
                        color="primary"
                        startIcon={module.completed ? <AssignmentIcon /> : <PlayArrowIcon />}
                        onClick={() => handleStartLesson(module)}
                        disabled={(!module.current && !module.completed) || isLoading}
                      >
                        {isLoading ? 'Carregando...' : module.completed ? 'Ver Conteúdo' : 'Iniciar Aula'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </ModuleCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openContentModal}
        onClose={() => setOpenContentModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Conteúdo Programático - Aulas Teóricas</Typography>
            <IconButton onClick={() => setOpenContentModal(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {mockTheoricalContent.map((module, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" pr={2}>
                  <Typography variant="subtitle1" fontWeight="500">
                    {module.module}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LinearProgress
                      variant="determinate"
                      value={module.progress}
                      sx={{ width: 100, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2" color="textSecondary">
                      {module.progress}%
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List disablePadding>
                  {module.lessons.map((lesson, lessonIndex) => (
                    <ListItem
                      key={lessonIndex}
                      sx={{
                        borderLeft: '2px solid',
                        borderLeftColor: lesson.completed ? 'success.main' : 'grey.300',
                        mb: 1,
                        bgcolor: 'background.paper',
                        borderRadius: '4px',
                      }}
                    >
                      <ListItemIcon>
                        {lesson.completed ? (
                          <CheckIcon color="success" />
                        ) : (
                          <TimerIcon color="action" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={`Duração: ${lesson.duration}`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        color={lesson.completed ? "success" : "primary"}
                        startIcon={lesson.completed ? <CheckIcon /> : <PlayArrowIcon />}
                      >
                        {lesson.completed ? "Revisitar" : "Iniciar"}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenContentModal(false)}>Fechar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenContentModal(false)}
          >
            Ir para Aulas
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default TheoreticalLessons; 