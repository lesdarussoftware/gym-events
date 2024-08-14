import { useEffect } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { format } from "date-fns";

import { useParticipants } from "../../hooks/useParticipants";

export function WorkOnEvent({ eventFormData, setAction }) {

    const { formData: event } = eventFormData;

    const { getParticipants, participants } = useParticipants();

    useEffect(() => {
        getParticipants();
    }, [])

    return (
        <Box sx={{ width: { xs: '100%', sm: '70%', maxWidth: '1500px' }, display: 'block', margin: 'auto', mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                    {event.name}
                </Typography>
                <Button variant="outlined" onClick={() => setAction(null)}>
                    <KeyboardBackspaceIcon />
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Descripción</TableCell>
                            <TableCell align="center">Fecha</TableCell>
                            <TableCell align="center">Lugar</TableCell>
                            <TableCell align="center">Activo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">{event.description}</TableCell>
                            <TableCell align="center">{format(new Date(event.date), 'dd/MM/yyyy')}</TableCell>
                            <TableCell align="center">{event.location}</TableCell>
                            <TableCell align="center">{event.is_active ? 'Sí' : 'No'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
}