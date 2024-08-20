/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { useParticipants } from "../../hooks/useParticipants";

import { WorkOnEventHeader } from "./WorkOnEventHeader";
import { Accordion, AccordionDetails, AccordionSummary } from "./AccordionComponents";
import { TabsComponent } from "../tabs/TabsComponent";

import { LEVELS } from "../../helpers/constants";

type Props = {
    eventFormData: any;
    setAction: any;
}

export function WorkOnEvent({ eventFormData, setAction }: Props) {

    const { formData: event } = eventFormData;

    const { getParticipants } = useParticipants();

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChangeAccordion = (panel: string) => (_: any, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        getParticipants();
    }, []);

    return (
        <Box sx={{ width: { xs: '100%', md: '70%', maxWidth: '1500px' }, display: 'block', margin: 'auto', mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">{`Evento #${event.id} ${event.name}`}</Typography>
                <Button variant="outlined" onClick={() => setAction(null)}>
                    <KeyboardBackspaceIcon />
                </Button>
            </Box>
            <WorkOnEventHeader event={event} />
            <Typography variant="h6">Detalles</Typography>
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
                        <TabsComponent level={level} event_id={event.id} />
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}