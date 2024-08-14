import Dexie, { type EntityTable } from "dexie";

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
    institution_name: string;
    institution_type: 'SCHOOL' | 'GYM';
}

interface EventParticipant {
    id: number;
    event_id: number;
    participant_id: number;
    participant_institution_name: string;
    participant_institution_type: string;
    level: number;
    category: 'PULGUITAS' | 'PREMINI' | 'MINI' | 'PRE INFANTIL' | 'INFANTIL' | 'JUVENIL' | 'MAYORES';
}

interface Note {
    id: number;
    event_participant_id: number;
    mode: 'SALTO' | 'PARALELAS' | 'VIGA' | 'SUELO';
    value: number;
}

const db = new Dexie('GymEventsDatabase') as Dexie & {
    events: EntityTable<Event, 'id'>;
    participants: EntityTable<Participant, 'id'>;
    events_participants: EntityTable<EventParticipant, 'id'>;
    notes: EntityTable<Note, 'id'>;
};

db.version(1).stores({
    events: 'id++, name, description, date, location, is_active',
    participants: 'id++, first_name, last_name, dni, phone, institution_id',
    events_participants: 'id++, event_id, participant_id, participant_institution_name, participant_institution_type, level, category',
    notes: 'id++, event_participant_id, mode, value',
});

export type { Event, Participant, EventParticipant, Note };
export { db };