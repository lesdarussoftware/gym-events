import { db, NoteGaf, NoteGam } from "./db";

export class NotesService {

    static async existsGaf(data: Omit<NoteGaf, 'id'>): Promise<boolean> {
        const notes = await NotesService.findAllGaf();
        return notes.some(n => n.event_participant_id === data.event_participant_id);
    }

    static async existsGam(data: Omit<NoteGam, 'id'>): Promise<boolean> {
        const notes = await NotesService.findAllGam();
        return notes.some(n => n.event_participant_id === data.event_participant_id);
    }

    static async findAllGaf(): Promise<(NoteGaf)[]> {
        const result = await db.notes_gaf.toArray();
        return result;
    }

    static async findAllGam(): Promise<(NoteGam)[]> {
        const result = await db.notes_gam.toArray();
        return result;
    }

    static async createNoteGaf(data: Omit<NoteGaf, 'id'>): Promise<number> {
        const exists = await NotesService.existsGaf(data);
        if (exists) throw new Error('Este registro ya existe.');
        const id = await db.notes_gaf.add(data);
        return id;
    }

    static async createNoteGam(data: Omit<NoteGam, 'id'>): Promise<number> {
        const exists = await NotesService.existsGam(data);
        if (exists) throw new Error('Este registro ya existe.');
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
