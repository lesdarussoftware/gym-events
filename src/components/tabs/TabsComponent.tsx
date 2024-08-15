import { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Box, FormControl, InputLabel, Select, MenuItem, Typography, Input, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';

import { useEventParticipants } from '../../hooks/useEventParticipants';

import { DataGrid } from '../datagrid/DataGrid';
import { ModalComponent } from '../ModalComponent';
import { CustomTabPanel } from './CustomTabPanel';

import { CATEGORIES } from '../../helpers/constants';
import { a11yProps } from '../../helpers/utils';
import { useParticipants } from '../../hooks/useParticipants';
import { useForm } from '../../hooks/useForm';

export function TabsComponent({ level, event_id }: { level: string; event_id: number }) {

    const { getParticipants, participants } = useParticipants();
    const { getEventParticipants, eventParticipants, action, setAction, headCells, handleSubmit } = useEventParticipants();
    const { formData, handleChange, setFormData, errors, disabled, validate, reset, setDisabled } = useForm({
        defaultData: {
            id: '',
            event_id,
            participant_id: '',
            participant_institution_name: '',
            level,
            category: '',
            salto_note: 0,
            paralelas_note: 0,
            viga_note: 0,
            suelo_note: 0
        },
        rules: {
            participant_id: { required: true }
        }
    });

    const [value, setValue] = useState(0);

    useEffect(() => {
        getParticipants();
        getEventParticipants(event_id);
    }, []);

    useEffect(() => {
        if (formData.participant_id.toString().length > 0) {
            setFormData({
                ...formData,
                participant_institution_name: participants.find(p => p.id === formData.participant_id)?.institution_name
            })
        }
    }, [formData.participant_id])

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => setValue(newValue);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChangeTab} aria-label="basic tabs example">
                    {CATEGORIES.map((cat, idx) => <Tab key={idx} label={cat} {...a11yProps(idx)} />)}
                </Tabs>
            </Box>
            {CATEGORIES.map((cat, idx) => (
                <CustomTabPanel key={idx} value={value} index={idx}>
                    <DataGrid
                        headCells={headCells}
                        rows={eventParticipants.filter(ev => ev.category === cat)}
                        setAction={setAction}
                        showEditAction
                        showDeleteAction
                        contentHeader={
                            <Box sx={{ display: 'flex', justifyContent: 'end', pr: 1 }}>
                                <Button
                                    variant='contained'
                                    size="small"
                                    sx={{ color: '#FFF' }}
                                    disabled={participants.length === 0}
                                    onClick={() => {
                                        setFormData({ ...formData, category: cat })
                                        setAction('NEW')
                                    }}
                                >
                                    <AddCircleIcon />
                                </Button>
                            </Box>
                        }
                    />
                </CustomTabPanel>
            ))}
            <ModalComponent open={action === 'NEW' || action === 'EDIT'} onClose={() => setAction(null)}>
                <Typography variant='h6' mb={1}>
                    {action === 'NEW' && 'Nuevo registro'}
                    {action === 'EDIT' && `Editar registro #${formData.id}`}
                </Typography>
                <form
                    onChange={handleChange}
                    onSubmit={e => handleSubmit(e, formData, validate, reset, setDisabled, action, setAction)}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="participant-select">Participante</InputLabel>
                            <Select
                                labelId="participant-select"
                                id="participant_id"
                                value={formData.participant_id}
                                label="Participante"
                                name="participant_id"
                                sx={{ width: '100%' }}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Seleccione</MenuItem>
                                {participants.map(p => (
                                    <MenuItem key={p.id} value={p.id}>{`${p.first_name} ${p.last_name}`}</MenuItem>
                                ))}
                            </Select>
                            {errors.participant_id?.type === 'required' &&
                                <Typography variant="caption" color="red" marginTop={1}>
                                    * El participante es requerido.
                                </Typography>
                            }
                        </FormControl>
                        {action === 'EDIT' &&
                            <>
                                <FormControl>
                                    <TextField
                                        label="Nota Salto"
                                        type="number"
                                        name='salto_note'
                                        value={formData.salto_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.01, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Nota Paralelas"
                                        type="number"
                                        name='paralelas_note'
                                        value={formData.paralelas_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.01, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Nota Viga"
                                        type="number"
                                        name='viga_note'
                                        value={formData.viga_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.01, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Nota Suelo"
                                        type="number"
                                        name='suelo_note'
                                        value={formData.suelo_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.01, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </>
                        }
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ color: '#fff', px: 2 }}
                                disabled={disabled}
                            >
                                <SaveIcon sx={{ transform: 'scale(1.3)' }} />
                            </Button>
                        </Box>
                    </Box>
                </form>
            </ModalComponent>
        </Box>
    );
}
