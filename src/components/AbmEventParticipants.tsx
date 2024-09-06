/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, TextField } from '@mui/material';

import { NoteGaf, NoteGam, Participant } from '../server/db';
import { getAllowedParticipants, getTotalGaf, getTotalGam } from '../helpers/utils';

interface AbmEventParticipantsProps {
    handleChange: any;
    handleSubmit: any;
    formData: any;
    validate: () => boolean;
    reset: () => void;
    setDisabled: (disabled: boolean) => void;
    action: any;
    setAction: any;
    participants: Participant[];
    errors: FormErrors;
    disabled: boolean;
    handleClose: () => void;
    gender: 'F' | 'M';
    updateNotes: (data: NoteGaf | NoteGam, gender: 'F' | 'M') => void;
}

interface FormErrors {
    participant_id?: {
        type: string;
    };
}

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
    handleClose,
    gender,
    updateNotes
}: AbmEventParticipantsProps) {
    return (
        <form
            onChange={handleChange}
            onSubmit={e => {
                if (action === 'NEW') handleSubmit(e, formData, validate, reset, setDisabled, setAction, gender)
                if (action === 'EDIT') updateNotes(formData, gender);
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
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
                        disabled={action === 'EDIT'}
                    >
                        <MenuItem value="">Seleccione</MenuItem>
                        {getAllowedParticipants(participants, gender).map((p: Participant) => (
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <FormControl>
                            <TextField
                                label="Nota Salto"
                                type="number"
                                name='salto_note'
                                value={formData.salto_note}
                                onChange={handleChange}
                                inputProps={{ step: 0.001, min: 0 }}
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
                                inputProps={{ step: 0.001, min: 0 }}
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
                                inputProps={{ step: 0.001, min: 0 }}
                                variant="outlined"
                            />
                        </FormControl>
                        {gender === 'F' &&
                            <>
                                <FormControl>
                                    <TextField
                                        label="Nota Viga"
                                        type="number"
                                        name='viga_note'
                                        value={formData.viga_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.001, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Total"
                                        type="number"
                                        value={getTotalGaf(formData)}
                                        variant="outlined"
                                        disabled
                                    />
                                </FormControl>
                            </>
                        }
                        {gender === 'M' &&
                            <>
                                <FormControl>
                                    <TextField
                                        label="Nota Barra Fija"
                                        type="number"
                                        name='barra_fija_note'
                                        value={formData.barra_fija_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.001, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Nota Razones"
                                        type="number"
                                        name='razones_note'
                                        value={formData.razones_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.001, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Nota Anillas"
                                        type="number"
                                        name='anillas_note'
                                        value={formData.anillas_note}
                                        onChange={handleChange}
                                        inputProps={{ step: 0.001, min: 0 }}
                                        variant="outlined"
                                    />
                                </FormControl>
                                <FormControl>
                                    <TextField
                                        label="Total"
                                        type="number"
                                        value={getTotalGam(formData)}
                                        variant="outlined"
                                        disabled
                                    />
                                </FormControl>
                            </>
                        }
                    </Box>
                }
                <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ px: 2 }}
                        disabled={disabled}
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ color: '#fff', px: 2 }}
                        disabled={disabled}
                    >
                        Guardar
                    </Button>
                </Box>
            </Box>
        </form>
    );
}
