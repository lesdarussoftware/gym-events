/* eslint-disable @typescript-eslint/no-explicit-any */
import { Participant } from "../server/db";

function descendingComparator(a: { [x: string]: any; }, b: { [x: string]: any; }, orderBy: string | number, sorter: (arg0: any) => any) {
    if ((b[orderBy] ? b[orderBy] : sorter(b)) < (a[orderBy] ? a[orderBy] : sorter(a))) {
        return -1;
    }
    if ((b[orderBy] ? b[orderBy] : sorter(b)) > (a[orderBy] ? a[orderBy] : sorter(a))) {
        return 1;
    }
    return 0;
}

export function getComparator(order: string, orderBy: any, sorter: any) {
    return order === 'desc'
        ? (a: any, b: any) => descendingComparator(a, b, orderBy, sorter)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy, sorter);
}

export function stableSort(array: any[], comparator: (arg0: any, arg1: any) => any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: number[], b: number[]) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any[]) => el[0]);
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function getTotalGaf(notes: {
    suelo_note: string;
    salto_note: string;
    viga_note: string;
    paralelas_note: string;
    penalization: string;
}): number {
    const { viga_note, salto_note, paralelas_note, suelo_note, penalization } = notes;

    const viga = Number(viga_note) || 0;
    const salto = Number(salto_note) || 0;
    const paralelas = Number(paralelas_note) || 0;
    const suelo = Number(suelo_note) || 0;
    const pen = Number(penalization) || 0;

    const total = (viga + suelo + paralelas + salto) - pen;

    return parseFloat(total.toFixed(3));
}

export function getTotalGam(notes: {
    suelo_note: string;
    salto_note: string;
    barra_fija_note: string;
    paralelas_note: string;
    arzones_note: string;
    anillas_note: string;
    penalization: string;
}): number {
    const { barra_fija_note, anillas_note, salto_note, paralelas_note, suelo_note, arzones_note, penalization } = notes;

    const barra = Number(barra_fija_note) || 0;
    const anillas = Number(anillas_note) || 0;
    const arzones = Number(arzones_note) || 0;
    const salto = Number(salto_note) || 0;
    const paralelas = Number(paralelas_note) || 0;
    const suelo = Number(suelo_note) || 0;
    const pen = Number(penalization) || 0;

    const total = (barra + anillas + arzones + suelo + paralelas + salto) - pen;

    return parseFloat(total.toFixed(3));
}

export function getParticipantAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

export function getAllowedParticipants(
    participants: Participant[], 
    gender: 'M' | 'F', 
    level: string,
    expectedCategory: string
): Participant[] {
    const categories = {
        'F': {
            'PULGUITAS': [3, 5],
            'PREMINI': [6, 7],
            'MINI': [8, 9],
            'PRE INFANTIL': [10, 11],
            'INFANTIL': [12, 13],
            'JUVENIL': [14, 15],
            'MAYOR': [16]
        },
        'M': {
            'PULGUITAS': [3, 5],
            'MINI': [6, 7],
            'PRE INFANTIL': [8, 9],
            'INFANTIL': [10, 11],
            'CADETES': [12, 13],
            'JUVENILES': [14, 15],
            'JUNIOR': [16, 17],
            'MAYOR': [18, 34],
            'SENIOR': [35]
        }
    }
    return participants.filter(p => {
        const age = getParticipantAge(p.birth.toISOString().split('T')[0]);
        const genderCategories = categories[p.gender];
        const category = (Object.keys(genderCategories) as Array<keyof typeof genderCategories>).find(cat => {
            return (genderCategories[cat].length === 1 && genderCategories[cat][0] <= age) ||
                (age >= genderCategories[cat][0] && age <= genderCategories[cat][genderCategories[cat].length - 1])
        });
        return p.gender === gender && p.level === level && category === expectedCategory && category !== undefined;
    });
}
