import { db, Event } from "./db";

export class EventService {

    static async nameExists(name: string): Promise<boolean> {
        const events = await EventService.findAll();
        return events.map(e => e.name).includes(name);
    }

    static async findAll(): Promise<Event[]> {
        const result = await db.events.toArray();
        return result;
    }

    static async create(event: Omit<Event, 'id'>): Promise<number> {
        const nameAlreadyExists = await EventService.nameExists(event.name);
        if (nameAlreadyExists) throw new Error('El evento ya existe.');
        const id = await db.events.add(event);
        return id;
    }

    static async update(updatedEvent: Partial<Event>): Promise<void> {
        if (updatedEvent.name) {
            const nameAlreadyExists = await EventService.nameExists(updatedEvent.name);
            if (nameAlreadyExists) throw new Error('El evento ya existe.');
        }
        await db.events.update(updatedEvent.id!, updatedEvent);
    }

    static async destroy(id: number): Promise<number> {
        const eventParticipants = await db.events_participants.where({ event_id: id }).toArray();
        await db.events_participants.bulkDelete(eventParticipants.map(ep => ep.id));
        await db.events.delete(id);
        return id;
    }

}
