import { db, EventParticipant } from "./db";

export class EventParticipantService {

    static async exists(data: Omit<EventParticipant, 'id'>): Promise<boolean> {
        const event_participants = await EventParticipantService.findAll(data.event_id);
        return event_participants.some(ev => ev.participant_id === data.participant_id);
    }

    static async findAll(event_id: number): Promise<EventParticipant[]> {
        const result = await db.events_participants.where({ event_id }).toArray();
        return result;
    }

    static async create(data: Omit<EventParticipant, 'id'>): Promise<number> {
        const exists = await EventParticipantService.exists(data);
        if (exists) throw new Error('Este registro ya existe.');
        const id = await db.events_participants.add(data);
        return id;
    }

    static async destroy(id: number): Promise<number> {
        await db.events_participants.delete(id);
        return id;
    }

}
