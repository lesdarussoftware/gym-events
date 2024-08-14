import { useEffect, useState } from "react";
import { Box, Button, Typography, Tabs, Tab } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps, } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import { useParticipants } from "../../hooks/useParticipants";

import { WorkOnEventHeader } from "./WorkOnEventHeader";
import { CATEGORIES, LEVELS } from "../../helpers/constants";

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export function WorkOnEvent({ eventFormData, setAction }) {
    const { formData: event } = eventFormData;

    const { getParticipants } = useParticipants();

    const [expanded, setExpanded] = useState<string | false>('panel0');

    const handleChangeAccordion = (panel: string) => (_: any, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        getParticipants();
    }, []);

    return (
        <Box sx={{ width: { xs: '100%', md: '70%', maxWidth: '1500px' }, display: 'block', margin: 'auto', mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{event.name}</Typography>
                <Button variant="outlined" onClick={() => setAction(null)}>
                    <KeyboardBackspaceIcon />
                </Button>
            </Box>
            <WorkOnEventHeader event={event} />
            {LEVELS.map((level, lvlIdx) => (
                <Accordion
                    key={lvlIdx}
                    expanded={expanded === `panel${lvlIdx}`}
                    onChange={handleChangeAccordion(`panel${lvlIdx}`)}
                >
                    <AccordionSummary aria-controls={`panel${lvlIdx}d-content`} id={`panel${lvlIdx}d-header`}>
                        <Typography>{level}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}

{/* <FormControl sx={{ width: '50%' }}>
                <InputLabel id="institution-type-select">Tipo</InputLabel>
                <Select
                    labelId="institution-type-select"
                    id="institution-type"
                    value={formData.institution_type}
                    label="Tipo"
                    name="institution-type"
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                >
                    <MenuItem value="">Seleccione</MenuItem>
                    <MenuItem value="SCHOOL">ESCUELA</MenuItem>
                    <MenuItem value="GYM">GIMNASIO</MenuItem>
                </Select>
                {errors.institution_type?.type === 'required' &&
                    <Typography variant="caption" color="red" marginTop={1}>
                        * El tipo de institución es requerido.
                    </Typography>
                }
            </FormControl> */}
