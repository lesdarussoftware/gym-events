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

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    phone?: string;
    institution_name?: string;
}

interface EventParticipant {
    id: number;
    event_id: number;
    participant_id: number;
    participant_institution_name?: string;
    level: 'ESCUELA 1' | 'ESCUELA 2' | 'NIVEL 1' | 'NIVEL 2' | 'NIVEL 3' | 'NIVEL 4' | 'NIVEL 5' | 'NIVEL 6' | 'NIVEL 7' | 'NIVEL 8' | 'NIVEL 9';
    category: 'PULGUITAS' | 'PREMINI' | 'MINI' | 'PRE INFANTIL' | 'INFANTIL' | 'JUVENIL' | 'MAYORES';
    salto_note: number;
    paralelas_note: number;
    viga_note: number;
    suelo_note: number;
}

const db = new Dexie('GymEventsDatabase') as Dexie & {
    activation: EntityTable<Activation, 'id'>;
    events: EntityTable<Event, 'id'>;
    participants: EntityTable<Participant, 'id'>;
    events_participants: EntityTable<EventParticipant, 'id'>;
};

db.version(1).stores({
    activation: 'id++, is_activated',
    events: 'id++, name, description, date, location, is_active',
    participants: 'id++, first_name, last_name, dni, phone, institution_name',
    events_participants: 'id++, event_id, participant_id, participant_institution_name, level, category, salto_note, paralelas_note, viga_note, suelo_note'
});

export type { Activation, Event, Participant, EventParticipant };
export { db };