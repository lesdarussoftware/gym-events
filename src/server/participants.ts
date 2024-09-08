import { db, Participant } from "./db";

export class ParticipantService {

    static async dniExists(dni: string): Promise<boolean> {
        const participants = await ParticipantService.findAll();
        return participants.map(p => p.dni).includes(dni);
    }

    static async findAll(): Promise<Participant[]> {
        const result = await db.participants.toArray();
        return result;
    }

    static async create(participant: Omit<Participant, 'id'>): Promise<number> {
        const dniAlreadyExists = await ParticipantService.dniExists(participant.dni);
        if (dniAlreadyExists) throw new Error('El participante ya existe.');
        const id = await db.participants.add(participant);
        return id;
    }

    static async update(updatedParticipant: Partial<Participant>): Promise<void> {
        if (updatedParticipant.dni) {
            const dniAlreadyExists = await ParticipantService.dniExists(updatedParticipant.dni);
            if (dniAlreadyExists) throw new Error('El participante ya existe.');
        }
        await db.participants.update(updatedParticipant.id!, updatedParticipant);
    }

    static async destroy(id: number): Promise<number> {
        const eventParticipants = await db.events_participants.where({ participant_id: id }).toArray();
        const epIds = eventParticipants.map(ep => ep.id)
        await db.events_participants.bulkDelete(epIds);
        const notesGaf = await db.notes_gaf.where({ event_participant_id: epIds }).toArray();
        const gafIds = notesGaf.map(n => n.id);
        await db.notes_gaf.bulkDelete(gafIds);
        const notesGam = await db.notes_gam.where({ event_participant_id: epIds }).toArray();
        const gamIds = notesGam.map(n => n.id);
        await db.notes_gam.bulkDelete(gamIds);
        await db.participants.delete(id);
        return id;
    }

}
