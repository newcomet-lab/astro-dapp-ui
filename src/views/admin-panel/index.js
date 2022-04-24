import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Stack
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

function createData(name, cohort, amount, vested, start, end, cliffDate, status) {
    return { name, cohort, amount, vested, start, end, cliffDate, status };
}

const rows = [
    createData('John Doe', 'Team', '10,000', 2708.33, '01/01/2022', '12/31/2025', '01/01/2023', 'Activated'),
    createData('Coach J', 'Advisors', '5,000', 856.34, '01/01/2022', '12/31/2025', '01/01/2023', 'Activated'),
    createData('Solana Sid', 'Kols', '1,000', 270, '01/01/2022', '12/31/2025', '01/01/2023', 'Activated'),
    createData('Jane Doe', 'Investors', '10,000', 200, '01/01/2022', '12/31/2025', '01/01/2023', 'Activated')
];

export default function AdminPanel() {
    return (
        <MainCard>
            <Grid>
                <Grid sx={{ mb : 2 }}>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained">Add New</Button>
                        <Button variant="contained" color="warning">Deactivate</Button>
                    </Stack>
                </Grid>
                <Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Cohort</TableCell>
                                    <TableCell align="center">Amount</TableCell>
                                    <TableCell align="center">Vested</TableCell>
                                    <TableCell align="center">Start</TableCell>
                                    <TableCell align="center">End</TableCell>
                                    <TableCell align="center">Cliff Date</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="center">{row.cohort}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">{row.vested}</TableCell>
                                        <TableCell align="center">{row.start}</TableCell>
                                        <TableCell align="center">{row.end}</TableCell>
                                        <TableCell align="center">{row.cliffDate}</TableCell>
                                        <TableCell align="center">{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </MainCard>
    );
}
