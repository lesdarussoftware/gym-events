import { Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { Participant } from '../server/db';

export function AbmEventParticipants({
    handleChange,
    handleSubmit,
    formData,
    validate,
    reset,
    setDisabled,
    action,
    setAction,
    participants,
    errors,
    disabled,
    handleClose
}) {
    return (
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
                        {participants.map((p: Participant) => (
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
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ px: 2 }}
                        disabled={disabled}
                        onClick={handleClose}
                    >
                        <HighlightOffIcon sx={{ transform: 'scale(1.3)' }} />
                    </Button>
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
    );
}