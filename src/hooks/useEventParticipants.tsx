import { useContext, useMemo, useState } from "react";

import { MessageContext } from "../providers/MessageProvider";

import { EventParticipant } from "../server/db";
import { EventParticipantService } from "../server/event-participants";

export function useEventParticipants() {

    const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext);

    const [eventParticipants, setEventParticipants] = useState<EventParticipant[]>([]);
    const [action, setAction] = useState<null | 'NEW' | 'EDIT' | 'DELETE'>(null);

    async function getEventParticipants(event_id: number): Promise<void> {
        const data = await EventParticipantService.findAll(event_id);
        setEventParticipants(data);
    }

    async function handleSubmit(
        e: { preventDefault: () => void; },
        formData: any,
        validate: () => any,
        reset: () => void,
        setDisabled: (arg0: boolean) => void,
        action: null | 'NEW' | 'EDIT' | 'DELETE',
        setAction: (arg0: null) => void
    ) {
        e.preventDefault();
        if (!validate()) return;
        try {
            if (action === 'NEW') {
                const id: number = await EventParticipantService.create({ ...formData, id: undefined });
                setEventParticipants(prev => [...prev, { id, ...formData }]);
                setMessage('Participante registrado correctamente.');
            }
            if (action === 'EDIT') {
                await EventParticipantService.update(formData);
                const id: number = formData.id!;
                setEventParticipants(prev => [...prev.filter(p => p.id !== id), formData]);
                setMessage('Notas editadas correctamente.');
            }
            reset();
            setSeverity('success');
            setAction(null);
        } catch (e) {
            setSeverity('error');
            if (e instanceof Error) {
                setMessage(`Ocurrió un error: ${e.message}`);
            } else {
                setMessage('Ocurrió un error inesperado.');
            }
        }
        setDisabled(false);
        setOpenMessage(true);
    }

    const headCells = useMemo(() => [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: '#',
            sorter: (row: EventParticipant) => row.id,
            accessor: 'id'
        },
        {
            id: 'participant_id',
            numeric: false,
            disablePadding: true,
            label: 'Nombre',
            sorter: (row: EventParticipant) => row.participant_id,
            accessor: 'participant_id'
        },
        {
            id: 'participant_institution_name',
            numeric: false,
            disablePadding: true,
            label: 'Institución',
            sorter: (row: EventParticipant) => row.participant_institution_name,
            accessor: 'participant_institution_name'
        },
        {
            id: 'salto_note',
            numeric: false,
            disablePadding: true,
            label: 'Salto',
            sorter: (row: EventParticipant) => row.salto_note,
            accessor: 'salto_note'
        },
        {
            id: 'paralelas_note',
            numeric: false,
            disablePadding: true,
            label: 'Paralelas',
            sorter: (row: EventParticipant) => row.paralelas_note,
            accessor: 'paralelas_note'
        },
        {
            id: 'viga_note',
            numeric: false,
            disablePadding: true,
            label: 'Viga',
            sorter: (row: EventParticipant) => row.viga_note,
            accessor: 'viga_note'
        },
        {
            id: 'suelo_note',
            numeric: false,
            disablePadding: true,
            label: 'Suelo',
            sorter: (row: EventParticipant) => row.suelo_note,
            accessor: 'suelo_note'
        },
        {
            id: 'total',
            numeric: false,
            disablePadding: true,
            label: 'Total',
            sorter: (row: EventParticipant) => row.id,
            accessor: () => '0.00'
        },
    ], []);

    return {
        eventParticipants,
        getEventParticipants,
        action,
        setAction,
        headCells,
        handleSubmit
    };
}
