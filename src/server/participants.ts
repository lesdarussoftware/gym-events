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

}
