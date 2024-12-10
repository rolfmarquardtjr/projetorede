import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  styled,
  IconButton,
  Chip,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Divider,
} from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'react-toastify';
import {
  ArrowBack as ArrowBackIcon,
  AccessTime as ClockIcon,
  EventAvailable as EventIcon,
  DirectionsCar as CarIcon,
  TwoWheeler as MotorcycleIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  height: '100%',
}));

const StyledCalendar = styled(Calendar)({
  width: '100%',
  maxWidth: '100%',
  backgroundColor: '#fff',
  border: 'none',
  borderRadius: 16,
  padding: '20px',
  '& .react-calendar__tile': {
    padding: '16px',
    height: '60px',
    fontSize: '1rem',
    '&:enabled:hover': {
      background: 'rgba(0, 109, 59, 0.08)',
      borderRadius: '8px',
    },
    '&--now': {
      background: 'rgba(0, 109, 59, 0.08)',
      borderRadius: '8px',
    },
    '&--active': {
      background: '#006D3B !important',
      borderRadius: '8px',
      color: '#fff',
    },
  },
  '& .react-calendar__navigation button': {
    minWidth: '44px',
    background: 'none',
    fontSize: '1.2rem',
    '&:enabled:hover': {
      background: 'rgba(0, 109, 59, 0.08)',
      borderRadius: '8px',
    },
  },
});

const TimeSlot = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  '&.available': {
    background: 'rgba(3, 4, 94, 0.08)',
    '&:hover': {
      background: 'rgba(3, 4, 94, 0.12)',
    },
  },
  '&.selected': {
    background: '#03045e !important',
    color: '#fff',
  },
  '&.unavailable': {
    background: 'rgba(3, 4, 94, 0.08)',
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

const steps = ['Selecionar Data', 'Escolher Horário', 'Confirmar Agendamento'];

const ScheduleSimulator = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    vehicleType: 'car' | 'motorcycle';
    simulator: string;
    instructor: string;
  } | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Horários disponíveis mockados com informações adicionais
  const availableTimeSlots = {
    car: [
      {
        time: '08:00',
        instructor: 'Carlos Silva',
        simulator: 'Simulador Carro 1',
        available: true,
      },
      {
        time: '09:30',
        instructor: 'Ana Paula',
        simulator: 'Simulador Carro 2',
        available: true,
      },
      {
        time: '14:00',
        instructor: 'Mariana Costa',
        simulator: 'Simulador Carro 1',
        available: true,
      },
    ],
    motorcycle: [
      {
        time: '08:30',
        instructor: 'Roberto Santos',
        simulator: 'Simulador Moto 1',
        available: true,
      },
      {
        time: '10:00',
        instructor: 'Pedro Oliveira',
        simulator: 'Simulador Moto 1',
        available: true,
      },
      {
        time: '15:30',
        instructor: 'Juliana Lima',
        simulator: 'Simulador Moto 1',
        available: true,
      },
    ],
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setActiveStep(1);
    setSelectedTime(null);
  };

  const handleTimeSelection = (time: string, vehicleType: 'car' | 'motorcycle', simulator: string, instructor: string) => {
    setSelectedTime({ time, vehicleType, simulator, instructor });
    setActiveStep(2);
  };

  const handleSchedule = () => {
    if (selectedDate && selectedTime) {
      toast.success('Aula agendada com sucesso!');
      navigate('/dashboard');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
          Agendar Aula de Simulador
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Selecione uma Data
              </Typography>
              <StyledCalendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                locale="pt-BR"
              />
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedDate ? 'Horários Disponíveis' : 'Informações'}
              </Typography>

              {selectedDate ? (
                <>
                  <Box mb={2}>
                    <Chip
                      icon={<EventIcon />}
                      label={formatDate(selectedDate)}
                      color="primary"
                      sx={{ mb: 2 }}
                    />
                  </Box>

                  {/* Seção Carro */}
                  <Box mb={3}>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <CarIcon color="primary" />
                      <Typography variant="h6">Simulador de Carro</Typography>
                    </Box>
                    {availableTimeSlots.car.map((slot) => (
                      <TimeSlot
                        key={`car-${slot.time}`}
                        variant={selectedTime?.time === slot.time && selectedTime?.vehicleType === 'car' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleTimeSelection(slot.time, 'car', slot.simulator, slot.instructor)}
                        disabled={!slot.available}
                        className={`${slot.available ? 'available' : 'unavailable'} ${selectedTime?.time === slot.time && selectedTime?.vehicleType === 'car' ? 'selected' : ''}`}
                      >
                        <ClockIcon />
                        <Box flex={1}>
                          <Typography variant="subtitle1">{slot.time}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {slot.instructor} • {slot.simulator}
                          </Typography>
                        </Box>
                        {slot.available ? (
                          <Chip
                            size="small"
                            label="Disponível"
                            color="success"
                            sx={{ ml: 1 }}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Ocupado"
                            color="error"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </TimeSlot>
                    ))}
                  </Box>

                  {/* Seção Moto */}
                  <Box>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <MotorcycleIcon color="primary" />
                      <Typography variant="h6">Simulador de Moto</Typography>
                    </Box>
                    {availableTimeSlots.motorcycle.map((slot) => (
                      <TimeSlot
                        key={`motorcycle-${slot.time}`}
                        variant={selectedTime?.time === slot.time && selectedTime?.vehicleType === 'motorcycle' ? 'contained' : 'outlined'}
                        color="primary"
                        onClick={() => handleTimeSelection(slot.time, 'motorcycle', slot.simulator, slot.instructor)}
                        disabled={!slot.available}
                        className={`${slot.available ? 'available' : 'unavailable'} ${selectedTime?.time === slot.time && selectedTime?.vehicleType === 'motorcycle' ? 'selected' : ''}`}
                      >
                        <ClockIcon />
                        <Box flex={1}>
                          <Typography variant="subtitle1">{slot.time}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {slot.instructor} • {slot.simulator}
                          </Typography>
                        </Box>
                        {slot.available ? (
                          <Chip
                            size="small"
                            label="Disponível"
                            color="success"
                            sx={{ ml: 1 }}
                          />
                        ) : (
                          <Chip
                            size="small"
                            label="Ocupado"
                            color="error"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </TimeSlot>
                    ))}
                  </Box>
                </>
              ) : (
                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <CarIcon />
                    </Avatar>
                    <Typography>Duração da aula: 1 hora</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <CheckIcon />
                    </Avatar>
                    <Typography>Chegue 10 minutos antes do horário</Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <InfoIcon />
                    </Avatar>
                    <Typography>
                      Em caso de cancelamento, avise com 24h de antecedência
                    </Typography>
                  </Box>
                </Box>
              )}

              {selectedTime && (
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSchedule}
                  sx={{ mt: 3 }}
                >
                  Confirmar Agendamento
                </Button>
              )}
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ScheduleSimulator; 