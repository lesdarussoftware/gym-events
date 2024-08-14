import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { useEvents } from "../hooks/useEvents";
import { useForm } from "../hooks/useForm";

import { Layout } from "../components/Layout";
import { AbmEvents } from "../components/AbmEvents";

export function Events({ window }) {

    const { events, getEvents, action, setAction } = useEvents();
    const eventFormData = useForm({
        defaultData: {
            id: '',
            name: '',
            description: '',
            date: new Date(Date.now()),
            location: '',
            is_active: true
        },
        rules: {
            name: { required: true, maxLength: 55 },
            description: { maxLength: 55 },
            location: { maxLength: 55 }
        }
    });

    useEffect(() => {
        if (!action) getEvents();
    }, [action])

    return (
        <Layout window={window}>
            {!action &&
                <Button
                    variant="contained"
                    sx={{ color: '#FFF', mt: 1, mb: 1 }}
                    onClick={() => setAction('NEW')}
                >
                    Nuevo
                </Button>
            }
            {!action && events.length === 0 &&
                <Typography variant="h5" align="center" pt={3}>
                    No hay eventos registrados.
                </Typography>
            }
            {!action && events.length > 0 &&
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
                    {events.map((event) => (
                        <Box
                            key={event.id}
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
                            <Typography variant="h6">{`#${event.id} ${event.name}`}</Typography>
                            <Button size="small" variant="contained"
                                sx={{ color: '#FFF' }}
                                onClick={() => {
                                    eventFormData.setFormData(event);
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
                <AbmEvents
                    eventFormData={eventFormData}
                    action={action}
                    setAction={setAction}
                />
            }
        </Layout>
    );
}