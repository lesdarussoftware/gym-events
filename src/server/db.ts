import Dexie, { type EntityTable } from "dexie";

interface Activation {
    id: number;
    is_activated: boolean;
}

interface Event {
    id: number;
    name: string;
    description?: string;
    date: Date;
    location?: string;
    is_active: boolean;
}

export type Level = 'ESCUELA 1' | 'ESCUELA 2' | 'NIVEL 1' | 'NIVEL 2' | 'NIVEL 3' | 'NIVEL 4' | 'NIVEL 5' | 'NIVEL 6' | 'NIVEL 7' | 'NIVEL 8' | 'NIVEL 9';

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    birth: Date;
    gender: 'M' | 'F';
    phone?: string;
    institution_name?: string;
    level: Level;
}

type Gaf = 'PULGUITAS' | 'PREMINI' | 'MINI' | 'PRE INFANTIL' | 'INFANTIL' | 'JUVENIL' | 'MAYOR'
type Gam = 'PULGUITAS' | 'MINI' | 'PRE INFANTIL' | 'INFANTIL' | 'CADETES' | 'JUVENILES' | 'JUNIOR' | 'MAYOR' | 'SENIOR'

interface EventParticipant {
    id: number;
    event_id: number;
    participant_id: number;
    participant_institution_name?: string;
    participant_level: string;
    category: Gaf | Gam;
}

interface NoteGaf {
    id: number;
    event_participant_id: number;
    salto_note: number;
    paralelas_note: number;
    viga_note: number;
    suelo_note: number;
}

interface NoteGam {
    id: number;
    event_participant_id: number;
    salto_note: number;
    paralelas_note: number;
    barra_fija_note: number;
    suelo_note: number;
    razones_note: number;
    anillas_note: number;
}

const db = new Dexie('GymEventsDatabase') as Dexie & {
    activation: EntityTable<Activation, 'id'>;
    events: EntityTable<Event, 'id'>;
    participants: EntityTable<Participant, 'id'>;
    events_participants: EntityTable<EventParticipant, 'id'>;
    notes_gaf: EntityTable<NoteGaf, 'id'>;
    notes_gam: EntityTable<NoteGam, 'id'>;
};

db.version(1).stores({
    activation: 'id++, is_activated',
    events: 'id++, name, description, date, location, is_active',
    participants: 'id++, first_name, last_name, dni, birth, gender, phone, institution_name, level',
    events_participants: 'id++, event_id, participant_id, participant_institution_name, participant_level, category',
    notes_gaf: 'id++, event_participant_id, salto_note, paralelas_note, viga_note, suelo_note',
    notes_gam: 'id++, event_participant_id, salto_note, paralelas_note, barra_fija_note, suelo_note, razones_note, anillas_note'
});

export type { Activation, Event, Participant, EventParticipant, NoteGaf, NoteGam };
export { db };