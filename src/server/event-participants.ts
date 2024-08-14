import { db, EventParticipant } from "./db";

export class EventParticipantService {

    static async exists({
        event_id,
        participant_id,
        level,
        category
    }: {
        event_id: number;
        participant_id: number;
        level: number;
        category: string;
    }): Promise<boolean> {
        const event_participants = await EventParticipantService.findAll(event_id);
        return event_participants.some(ev => {
            return ev.participant_id === participant_id && ev.level === level && ev.category === category;
        });
    }

    static async findAll(event_id: number): Promise<EventParticipant[]> {
        const result = await db.events_participants.where({ event_id }).toArray();
        return result;
    }

    static async create(data: Omit<EventParticipant, 'id'>): Promise<number> {
        const exists = await EventParticipantService.exists({
            event_id: data.event_id,
            participant_id: data.participant_id,
            level: data.level,
            category: data.category
        });
        if (exists) throw new Error('Este registro ya existe.');
        const id = await db.events_participants.add(data);
        return id;
    }

}
