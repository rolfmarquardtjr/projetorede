import { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  styled,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const AdminDashboard = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Dados mockados dos alunos
  const students = [
    {
      id: 1,
      name: 'João da Silva',
      progress: '40%',
      nextClass: 'Legislação de Trânsito',
      status: 'Em dia',
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      progress: '65%',
      nextClass: 'Simulador',
      status: 'Pendente',
    },
    {
      id: 3,
      name: 'Pedro Santos',
      progress: '25%',
      nextClass: 'Direção Defensiva',
      status: 'Em dia',
    },
  ];

  const handleSendNotification = () => {
    toast.success('Notificação enviada com sucesso!');
    setOpenNotification(false);
    setNotificationMessage('');
    setSelectedStudent(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Painel Administrativo
      </Typography>

      <Grid container spacing={3}>
        {/* Cards de Resumo */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total de Alunos
              </Typography>
              <Typography variant="h3">150</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Aulas Hoje
              </Typography>
              <Typography variant="h3">12</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Simuladores Ativos
              </Typography>
              <Typography variant="h3">4/4</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Alunos */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alunos Ativos
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Nome</StyledTableCell>
                      <StyledTableCell>Progresso</StyledTableCell>
                      <StyledTableCell>Próxima Aula</StyledTableCell>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell>Ações</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.progress}</TableCell>
                        <TableCell>{student.nextClass}</TableCell>
                        <TableCell>{student.status}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedStudent(student.name);
                              setOpenNotification(true);
                            }}
                          >
                            <MessageIcon />
                          </IconButton>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Agenda do Dia */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Agenda do Dia
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle1">
                      {`${8 + index}:00 - Simulador ${(index % 4) + 1}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Aluno: {students[index % 3].name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notificações Recentes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notificações Recentes
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle1">
                      <NotificationsIcon
                        fontSize="small"
                        sx={{ mr: 1, verticalAlign: 'middle' }}
                      />
                      {`Notificação ${index + 1}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Há {index + 1} hora(s) atrás
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modal de Notificação */}
      <Dialog
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Enviar Notificação</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Para: {selectedStudent}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Digite sua mensagem..."
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNotification(false)}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendNotification}
            disabled={!notificationMessage.trim()}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 