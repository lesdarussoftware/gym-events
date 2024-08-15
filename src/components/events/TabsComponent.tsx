import { useEffect, useMemo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useEventParticipants } from '../../hooks/useEventParticipants';

import { CATEGORIES } from '../../helpers/constants';
import { DataGrid } from '../datagrid/DataGrid';
import { EventParticipant } from '../../server/db';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function TabsComponent({ level, event_id }: { level: string; event_id: number }) {

    const { getEventParticipants, eventParticipants, action, setAction } = useEventParticipants();

    const [value, setValue] = useState(0);

    useEffect(() => {
        getEventParticipants(event_id);
    }, []);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const headCells = useMemo(() => [
        {
            id: 'id',
            numeric: false,
            disablePadding: true,
            label: '#',
            sorter: (row: EventParticipant) => row.id,
            accessor: 'id'
        },
        {
            id: 'participant_id',
            numeric: false,
            disablePadding: true,
            label: 'Nombre',
            sorter: (row: EventParticipant) => row.participant_id,
            accessor: 'participant_id'
        },
        {
            id: 'participant_institution_name',
            numeric: false,
            disablePadding: true,
            label: 'Institución',
            sorter: (row: EventParticipant) => row.participant_institution_name,
            accessor: 'participant_institution_name'
        },
        {
            id: 'salto_note',
            numeric: false,
            disablePadding: true,
            label: 'Salto',
            sorter: (row: EventParticipant) => row.salto_note,
            accessor: 'salto_note'
        },
        {
            id: 'paralelas_note',
            numeric: false,
            disablePadding: true,
            label: 'Paralelas',
            sorter: (row: EventParticipant) => row.paralelas_note,
            accessor: 'paralelas_note'
        },
        {
            id: 'viga_note',
            numeric: false,
            disablePadding: true,
            label: 'Viga',
            sorter: (row: EventParticipant) => row.viga_note,
            accessor: 'viga_note'
        },
        {
            id: 'suelo_note',
            numeric: false,
            disablePadding: true,
            label: 'Suelo',
            sorter: (row: EventParticipant) => row.suelo_note,
            accessor: 'suelo_note'
        },
        {
            id: 'total',
            numeric: false,
            disablePadding: true,
            label: 'Total',
            sorter: (row: EventParticipant) => row.id,
            accessor: () => '0.00'
        },
    ], []);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {CATEGORIES.map((cat, idx) => (
                        <Tab key={idx} label={cat} {...a11yProps(idx)} />
                    ))}
                </Tabs>
            </Box>
            {CATEGORIES.map((cat, idx) => (
                <CustomTabPanel key={idx} value={value} index={idx}>
                    <DataGrid
                        headCells={headCells}
                        rows={eventParticipants.filter(ev => ev.category === cat)}
                        setAction={setAction}
                    />
                </CustomTabPanel>
            ))}
        </Box>
    );
}
