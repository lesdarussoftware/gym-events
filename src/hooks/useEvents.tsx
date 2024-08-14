import { useContext, useState } from "react";

import { MessageContext } from "../providers/MessageProvider";

import { Event } from "../server/db";
import { EventService } from "../server/events";

export function useEvents() {

    const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext)

    const [events, setEvents] = useState<Event[]>([]);
    const [action, setAction] = useState<null | 'NEW' | 'EDIT'>(null);

    async function getEvents(): Promise<void> {
        const data = await EventService.findAll();
        setEvents(data);
    }

    async function handleSubmit(
        e: { preventDefault: () => void; },
        formData: any,
        validate: () => any,
        reset: () => void,
        setDisabled: (arg0: boolean) => void,
        action: string,
        setAction: (arg0: null) => void
    ) {
        e.preventDefault();
        if (!validate()) return;
        try {
            if (action === 'NEW') {
                const id: number = await EventService.create({ ...formData, id: undefined });
                setEvents(prevEvents => [...prevEvents, { id, ...formData }]);
                setMessage('Evento registrado correctamente.');
            }
            if (action === 'EDIT') {
                await EventService.update(formData);
                const id: number = formData.id!;
                setEvents(prevEvents => [...prevEvents.filter(e => e.id !== id), formData]);
                setMessage('Evento editado correctamente.');
            }
            reset();
            setSeverity('success');
            setDisabled(false)
            setAction(null);
        } catch (e) {
            setSeverity('error');
            setMessage('Ocurrió un error.');
        }
        setOpenMessage(true);
    }

    return {
        events,
        getEvents,
        action,
        setAction,
        handleSubmit
    }
}