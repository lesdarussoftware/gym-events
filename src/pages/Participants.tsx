import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useParticipants } from "../hooks/useParticipants";
import { useForm } from "../hooks/useForm";

import { Layout } from "../components/Layout";
import { AbmParticipants } from "../components/AbmParticipants";

export function Participants({ window }) {

    const { participants, getParticipants, action, setAction } = useParticipants();
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
            dni: { required: true, maxLength: 10 },
            phone: { maxLength: 25 },
            institution_name: { maxLength: 55 }
        }
    });

    useEffect(() => {
        if (!action) getParticipants();
    }, [action])

    return (
        <Layout window={window}>
            {!action &&
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
            {!action && participants.length > 0 &&
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
        </Layout>
    );
}