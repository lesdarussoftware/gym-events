import { Participant } from "../server/db";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
}): number {
    const { viga_note, salto_note, paralelas_note, suelo_note } = notes;

    const viga = Number(viga_note) || 0;
    const salto = Number(salto_note) || 0;
    const paralelas = Number(paralelas_note) || 0;
    const suelo = Number(suelo_note) || 0;

    const total = viga + suelo + paralelas + salto;

    return parseFloat(total.toFixed(3));
}

export function getTotalGam(notes: {
    suelo_note: string;
    salto_note: string;
    barra_fija_note: string;
    paralelas_note: string;
    razones_note: string;
    anillas_note: string;
}): number {
    const { barra_fija_note, anillas_note, salto_note, paralelas_note, suelo_note, razones_note } = notes;

    const barra = Number(barra_fija_note) || 0;
    const anillas = Number(anillas_note) || 0;
    const razones = Number(razones_note) || 0;
    const salto = Number(salto_note) || 0;
    const paralelas = Number(paralelas_note) || 0;
    const suelo = Number(suelo_note) || 0;

    const total = barra + anillas + razones + suelo + paralelas + salto;

    return parseFloat(total.toFixed(3));
}

export function getAllowedParticipants(participants: Participant[], gender: 'M' | 'F'): Participant[] {

    return participants;
}
