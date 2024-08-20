/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";

import { MessageContext } from "../providers/MessageProvider";

import { Participant } from "../server/db";
import { ParticipantService } from "../server/participants";

export function useParticipants() {

    const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext);

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [action, setAction] = useState<null | 'NEW' | 'EDIT' | 'DELETE'>(null);

    async function getParticipants(): Promise<void> {
        const data = await ParticipantService.findAll();
        setParticipants(data);
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
                const id: number = await ParticipantService.create({ ...formData, id: undefined });
                setParticipants(prevParticipants => [...prevParticipants, { id, ...formData }]);
                setMessage('Participante registrado correctamente.');
            }
            if (action === 'EDIT') {
                await ParticipantService.update(formData);
                const id: number = formData.id!;
                setParticipants(prevParticipants => [...prevParticipants.filter(p => p.id !== id), formData]);
                setMessage('Participante editado correctamente.');
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

    async function destroy(id: number, reset: () => void, setAction: (arg0: null) => void): Promise<void> {
        try {
            await ParticipantService.destroy(id);
            setParticipants(prev => [...prev.filter(p => p.id !== id)]);
            setMessage('Participante eliminado correctamente.');
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

    return {
        participants,
        getParticipants,
        action,
        setAction,
        handleSubmit,
        destroy
    };
}
