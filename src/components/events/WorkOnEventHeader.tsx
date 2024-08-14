import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format } from "date-fns";

export function WorkOnEventHeader({ event }) {
    return (
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
    );
}