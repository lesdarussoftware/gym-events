import { db, EventParticipant } from "./db";

export class EventParticipantService {

    static async exists(event_id: number, participant_id: number): Promise<boolean> {
        const event_participants = await db.events_participants.where({ event_id }).toArray();
        return event_participants.some(ev => ev.participant_id === participant_id);
    }

    static async findAll({ event_id, participant_id, level, category }: {
        event_id: number;
        participant_id: number;
        level: string;
        category: string;
    }): Promise<EventParticipant[]> {
        const result = await db.events_participants.where({ event_id, participant_id, level, category }).toArray();
        return result;
    }

    static async create(data: Omit<EventParticipant, 'id'>): Promise<number> {
        const exists = await EventParticipantService.exists(data.event_id, data.participant_id);
        if (exists) throw new Error('Este registro ya existe.');
        const id = await db.events_participants.add(data);
        return id;
    }

}
