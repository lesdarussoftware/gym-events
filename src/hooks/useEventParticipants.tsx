import { useState } from "react";

// import { MessageContext } from "../providers/MessageProvider";

import { EventParticipant } from "../server/db";
import { EventParticipantService } from "../server/event-participants";

export function useEventParticipants() {

    // const { setSeverity, setMessage, setOpenMessage } = useContext(MessageContext);

    const [eventParticipants, setEventParticipants] = useState<EventParticipant[]>([]);
    const [action, setAction] = useState<null | 'NEW' | 'EDIT' | 'DELETE'>(null);

    async function getEventParticipants(event_id: number): Promise<void> {
        const data = await EventParticipantService.findAll(event_id);
        setEventParticipants(data);
    }

    return {
        eventParticipants,
        getEventParticipants,
        action,
        setAction
    };
}
