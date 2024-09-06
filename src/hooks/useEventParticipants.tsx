/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo, useState } from "react";

import { MessageContext } from "../providers/MessageProvider";

import { EventParticipant, NoteGaf, NoteGam, Participant } from "../server/db";
import { EventParticipantService } from "../server/event-participants";
import { ParticipantService } from "../server/participants";

import { getTotalGaf, getTotalGam } from "../helpers/utils";
import { NotesService } from "../server/notes";

export function useEventParticipants() {

    const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext);

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [eventParticipants, setEventParticipants] = useState<EventParticipant[]>([]);
    const [action, setAction] = useState<null | 'NEW' | 'EDIT' | 'DELETE'>(null);

    async function getAll(event_id: number): Promise<void> {
        const dataParticipants = await ParticipantService.findAll();
        setParticipants(dataParticipants);
        const notesGaf = await NotesService.findAllGaf();
        const notesGam = await NotesService.findAllGam();
        const data = await EventParticipantService.findAll(event_id);
        setEventParticipants(data.map(ev => {
            const participant = dataParticipants.find(p => p.id === ev.participant_id)!;
            let notes;
            if (participant.gender === 'F') {
                notes = notesGaf.find(n => n.event_participant_id === ev.participant_id);
            }
            if (participant.gender === 'M') {
                notes = notesGam.find(n => n.event_participant_id === ev.participant_id);
            }
            return { ...ev, participant, notes };
        }));
    }

    async function handleSubmit(
        e: { preventDefault: () => void; },
        formData: any,
        validate: () => any,
        reset: () => void,
        setDisabled: (arg0: boolean) => void,
        setAction: (arg0: null) => void,
        gender: 'M' | 'F'
    ) {
        e.preventDefault();
        if (!validate()) return;
        try {
            const id: number = await EventParticipantService.create({
                ...formData,
                id: undefined,
                participant: undefined
            });
            setEventParticipants(prev => [...prev, {
                ...formData, id,
                participant: participants.find(p => p.id === formData.participant_id)!
            }]);
            if (gender === 'M') await NotesService.createNoteGaf({
                event_participant_id: id,
                salto_note: formData.salto_note,
                paralelas_note: formData.paralelas_note,
                suelo_note: formData.suelo_note,
                viga_note: formData.viga_note
            })
            if (gender === 'F') await NotesService.createNoteGam({
                event_participant_id: id,
                salto_note: formData.salto_note,
                paralelas_note: formData.paralelas_note,
                suelo_note: formData.suelo_note,
                barra_fija_note: formData.barra_fija_note,
                razones_note: formData.razones_note,
                anillas_note: formData.anillas_note
            })
            setMessage('Participante registrado correctamente.');
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

    async function updateNotes(data: NoteGaf | NoteGam, gender: 'F' | 'M') {
        try {
            if (gender === 'F') await NotesService.updateNoteGaf(data);
            if (gender === 'M') await NotesService.updateNoteGam(data);
            setMessage('Notas actualizadas correctamente.');
            setSeverity('success');
        } catch (e) {
            setSeverity('error');
            if (e instanceof Error) {
                setMessage(`Ocurrió un error: ${e.message}`);
            } else {
                setMessage('Ocurrió un error inesperado.');
            }
        }
        setOpenMessage(true);
    }

    async function destroy(id: number, reset: () => void, setAction: (arg0: null) => void): Promise<void> {
        try {
            await EventParticipantService.destroy(id);
            setEventParticipants(prev => [...prev.filter(ev => ev.id !== id)]);
            setMessage('Registro eliminado correctamente.');
            setSeverity('success');
            setAction(null);
            reset();
        } catch (e) {
            setSeverity('error');
            if (e instanceof Error) {
                setMessage(`Ocurrió un error: ${e.message}`);
            } else {
                setMessage('Ocurrió un error inesperado.');
            }
        }
        setOpenMessage(true);
    }

    const headCells = [
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
            sorter: (row: EventParticipant & { participant: Participant }) => `${row.participant.first_name} ${row.participant.last_name}`,
            accessor: (row: EventParticipant & { participant: Participant }) => `${row.participant.first_name} ${row.participant.last_name}`
        },
        {
            id: 'participant_institution_name',
            numeric: false,
            disablePadding: true,
            label: 'Gym / Esc.',
            sorter: (row: EventParticipant) => row.participant_institution_name,
            accessor: 'participant_institution_name'
        },
    ]

    const headCellsGaf = useMemo(() => [
        ...headCells,
        {
            id: 'salto_note',
            numeric: false,
            disablePadding: true,
            label: 'Salto',
            sorter: (row: EventParticipant & { notes: { salto_note: string } }) => row.notes.salto_note,
            accessor: (row: EventParticipant & { notes: { salto_note: string } }) => row.notes.salto_note
        },
        {
            id: 'paralelas_note',
            numeric: false,
            disablePadding: true,
            label: 'Paral.',
            sorter: (row: EventParticipant & { notes: { paralelas_note: string } }) => row.notes.paralelas_note,
            accessor: (row: EventParticipant & { notes: { paralelas_note: string } }) => row.notes.paralelas_note
        },
        {
            id: 'viga_note',
            numeric: false,
            disablePadding: true,
            label: 'Viga',
            sorter: (row: EventParticipant & { notes: { viga_note: string } }) => row.notes.viga_note,
            accessor: (row: EventParticipant & { notes: { viga_note: string } }) => row.notes.viga_note
        },
        {
            id: 'suelo_note',
            numeric: false,
            disablePadding: true,
            label: 'Suelo',
            sorter: (row: EventParticipant & { notes: { suelo_note: string } }) => row.notes.suelo_note,
            accessor: (row: EventParticipant & { notes: { suelo_note: string } }) => row.notes.suelo_note
        },
        {
            id: 'total',
            numeric: false,
            disablePadding: true,
            label: 'Total',
            sorter: (row: EventParticipant) => row.id,
            accessor: (row: EventParticipant & {
                notes: {
                    suelo_note: string;
                    salto_note: string;
                    viga_note: string;
                    paralelas_note: string;
                }
            }) => getTotalGaf(row.notes)
        }
    ], []);

    const headCellsGam = useMemo(() => [
        ...headCells,
        {
            id: 'salto_note',
            numeric: false,
            disablePadding: true,
            label: 'Salto',
            sorter: (row: EventParticipant & { notes: { salto_note: string } }) => row.notes.salto_note,
            accessor: (row: EventParticipant & { notes: { salto_note: string } }) => row.notes.salto_note
        },
        {
            id: 'paralelas_note',
            numeric: false,
            disablePadding: true,
            label: 'Paral.',
            sorter: (row: EventParticipant & { notes: { paralelas_note: string } }) => row.notes.paralelas_note,
            accessor: (row: EventParticipant & { notes: { paralelas_note: string } }) => row.notes.paralelas_note
        },
        {
            id: 'barra_fija_note',
            numeric: false,
            disablePadding: true,
            label: 'Barra fija',
            sorter: (row: EventParticipant & { notes: { barra_fija_note: string } }) => row.notes.barra_fija_note,
            accessor: (row: EventParticipant & { notes: { barra_fija_note: string } }) => row.notes.barra_fija_note
        },
        {
            id: 'suelo_note',
            numeric: false,
            disablePadding: true,
            label: 'Suelo',
            sorter: (row: EventParticipant & { notes: { suelo_note: string } }) => row.notes.suelo_note,
            accessor: (row: EventParticipant & { notes: { suelo_note: string } }) => row.notes.suelo_note
        },
        {
            id: 'razones_note',
            numeric: false,
            disablePadding: true,
            label: 'Razones',
            sorter: (row: EventParticipant & { notes: { razones_note: string } }) => row.notes.razones_note,
            accessor: (row: EventParticipant & { notes: { razones_note: string } }) => row.notes.razones_note
        },
        {
            id: 'anillas_note',
            numeric: false,
            disablePadding: true,
            label: 'Anillas',
            sorter: (row: EventParticipant & { notes: { anillas_note: string } }) => row.notes.anillas_note,
            accessor: (row: EventParticipant & { notes: { anillas_note: string } }) => row.notes.anillas_note
        },
        {
            id: 'total',
            numeric: false,
            disablePadding: true,
            label: 'Total',
            sorter: (row: EventParticipant) => row.id,
            accessor: (row: EventParticipant & {
                notes: {
                    suelo_note: string;
                    salto_note: string;
                    barra_fija_note: string;
                    paralelas_note: string;
                    razones_note: string;
                    anillas_note: string;
                }
            }) => getTotalGam(row.notes)
        }
    ], []);

    return {
        eventParticipants,
        getAll,
        action,
        setAction,
        headCellsGaf,
        headCellsGam,
        handleSubmit,
        destroy,
        updateNotes
    };
}
