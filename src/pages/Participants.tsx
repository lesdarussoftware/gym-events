import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useParticipants } from "../hooks/useParticipants";
import { useForm } from "../hooks/useForm";

import { Layout } from "../components/Layout";
import { AbmParticipants } from "../components/AbmParticipants";
import { ModalComponent } from "../components/ModalComponent";

export function Participants({ window }) {

    const { participants, getParticipants, action, setAction, destroy } = useParticipants();
    const participantFormData = useForm({
        defaultData: {
            id: '',
            first_name: '',
            last_name: '',
            dni: '',
            phone: '',
            institution_name: '',
        },
        rules: {
            first_name: { required: true, maxLength: 55 },
            last_name: { required: true, maxLength: 55 },
            dni: { required: true, minLength: 6, maxLength: 10 },
            phone: { maxLength: 25 },
            institution_name: { maxLength: 55 }
        }
    });

    useEffect(() => {
        if (!action) getParticipants();
    }, [action])

    return (
        <Layout window={window}>
            {(!action || action === 'DELETE') &&
                <Button
                    variant="contained"
                    sx={{ color: '#FFF', mt: 1, mb: 3 }}
                    onClick={() => setAction('NEW')}
                >
                    <AddCircleIcon />
                </Button>
            }
            {!action && participants.length === 0 &&
                <Typography variant="h5" align="center" pt={3}>
                    No hay participantes registrados.
                </Typography>
            }
            {(!action || action === 'DELETE') && participants.length > 0 &&
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
                    {participants.map((participant) => (
                        <Box
                            key={participant.id}
                            sx={{
                                p: 1,
                                mb: 1,
                                borderRadius: 1,
                                boxShadow: '1px 1px 3px #B6B6B6',
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                width: { xs: '100%', md: '49%' }
                            }}
                        >
                            <Typography variant="h6">
                                {`#${participant.id} ${participant.first_name} ${participant.last_name}`}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button size="small" variant="contained"
                                    sx={{ color: '#FFF' }}
                                    onClick={() => {
                                        participantFormData.setFormData(participant);
                                        setAction('DELETE');
                                    }}
                                >
                                    <DeleteForeverIcon />
                                </Button>
                                <Button size="small" variant="contained"
                                    sx={{ color: '#FFF' }}
                                    onClick={() => {
                                        participantFormData.setFormData(participant);
                                        setAction('EDIT');
                                    }}
                                >
                                    <EditIcon />
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            }
            {(action === 'NEW' || action === 'EDIT') &&
                <AbmParticipants
                    participantFormData={participantFormData}
                    action={action}
                    setAction={setAction}
                />
            }
            <ModalComponent open={action === 'DELETE'} onClose={() => setAction(null)}>
                <Typography variant='h6' align='center' mb={1}>
                    {`¿Eliminar el registro de ${participantFormData.formData?.first_name} 
                    ${participantFormData.formData?.last_name} (${participantFormData.formData?.dni})?`}
                </Typography>
                <Typography variant='body1' align='center' mb={3}>
                    Se eliminarán todos los datos relacionados a este participante y no podrán ser recuperados.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                    <Button
                        type="button"
                        variant="contained"
                        sx={{ color: '#fff', px: 2 }}
                        onClick={() => destroy(participantFormData.formData.id, participantFormData.reset, setAction)}
                    >
                        Eliminar
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ px: 2 }}
                        onClick={() => setAction(null)}
                    >
                        Cancelar
                    </Button>
                </Box>
            </ModalComponent>
        </Layout>
    );
}