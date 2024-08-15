import { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Box, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { useEventParticipants } from '../../hooks/useEventParticipants';
import { useParticipants } from '../../hooks/useParticipants';
import { useForm } from '../../hooks/useForm';

import { DataGrid } from '../datagrid/DataGrid';
import { ModalComponent } from '../ModalComponent';
import { CustomTabPanel } from './CustomTabPanel';
import { AbmEventParticipants } from '../AbmEventParticipants';

import { CATEGORIES } from '../../helpers/constants';
import { a11yProps } from '../../helpers/utils';

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

    const handleClose = () => {
        setAction(null)
        reset();
    }

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
                        setData={setFormData}
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
            <ModalComponent open={action === 'NEW' || action === 'EDIT'} onClose={handleClose}>
                <Typography variant='h6' mb={1}>
                    {action === 'NEW' && 'Nuevo registro'}
                    {action === 'EDIT' && `Editar registro #${formData.id}`}
                </Typography>
                <Typography variant='body1' mb={1}>
                    {formData.level}
                </Typography>
                <Typography variant='body1' mb={1}>
                    {formData.category}
                </Typography>
                <AbmEventParticipants
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    formData={formData}
                    validate={validate}
                    reset={reset}
                    setDisabled={setDisabled}
                    action={action}
                    setAction={setAction}
                    participants={participants}
                    errors={errors}
                    disabled={disabled}
                    handleClose={handleClose}
                />
            </ModalComponent>
        </Box>
    );
}
