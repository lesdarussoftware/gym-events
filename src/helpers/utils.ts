import { EventParticipant } from "../server/db";

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

export function getTotal(eventParticipant: EventParticipant): number {
    const { viga_note, salto_note, paralelas_note, suelo_note } = eventParticipant;

    const viga = Number(viga_note) || 0;
    const salto = Number(salto_note) || 0;
    const paralelas = Number(paralelas_note) || 0;
    const suelo = Number(suelo_note) || 0;

    const total = viga + suelo + paralelas + salto;

    return parseFloat(total.toFixed(3));
}
