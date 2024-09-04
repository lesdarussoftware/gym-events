import { db, NoteGaf, NoteGam } from "./db";

export class NotesService {

    static async findAllGaf(event_participant_id: number): Promise<(NoteGaf)[]> {
        const result = await db.notes_gaf.where({ event_participant_id }).toArray();
        return result;
    }

    static async findAllGam(event_participant_id: number): Promise<(NoteGam)[]> {
        const result = await db.notes_gam.where({ event_participant_id }).toArray();
        return result;
    }

    static async createNoteGaf(data: Omit<NoteGaf, 'id'>): Promise<number> {
        const id = await db.notes_gaf.add(data);
        return id;
    }

    static async createNoteGam(data: Omit<NoteGam, 'id'>): Promise<number> {
        const id = await db.notes_gam.add(data);
        return id;
    }

    static async updateNoteGaf(data: Partial<NoteGaf>): Promise<void> {
        await db.notes_gaf.update(data.id!, {
            salto_note: data.salto_note,
            paralelas_note: data.paralelas_note,
            viga_note: data.viga_note,
            suelo_note: data.suelo_note
        });
    }

    static async updateNoteGam(data: Partial<NoteGam>): Promise<void> {
        await db.notes_gam.update(data.id!, {
            salto_note: data.salto_note,
            paralelas_note: data.paralelas_note,
            barra_fija_note: data.barra_fija_note,
            suelo_note: data.suelo_note,
            razones_note: data.razones_note,
            anillas_note: data.anillas_note
        });
    }

    static async destroyNoteGaf(id: number): Promise<number> {
        await db.notes_gaf.delete(id);
        return id;
    }

    static async destroyNoteGam(id: number): Promise<number> {
        await db.notes_gam.delete(id);
        return id;
    }

}
