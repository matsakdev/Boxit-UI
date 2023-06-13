import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    cursor: 'pointer',
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },

}));

const TableWrapper = styled('div')({
    width: '100%',
    maxWidth: '1850px',
});

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ContainersTable(props) {
    const containers = props.containers;
    const navigate = useNavigate();

    const handleClick = (event, containerId) => {
        navigate(`/containers/${containerId}`);
    }

    return (
        <div>
            <TableWrapper>
                <TableContainer component={Paper} sx={{width: "100%", marginTop: "2rem", padding: '2rem'}}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow hover sx={{cursor: 'pointer'}}>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell align="right">Status</StyledTableCell>
                                <StyledTableCell align="right">Length</StyledTableCell>
                                <StyledTableCell align="right">Width</StyledTableCell>
                                <StyledTableCell align="right">Height</StyledTableCell>
                                <StyledTableCell align="right">Type</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {containers.map((container) => (
                                <StyledTableRow key={container.id} onClick={(event) => handleClick(event, container.id)}>
                                    <StyledTableCell component="th" scope="row">
                                        {container.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{container.status}</StyledTableCell>
                                    <StyledTableCell align="right">{container.length}</StyledTableCell>
                                    <StyledTableCell align="right">{container.width}</StyledTableCell>
                                    <StyledTableCell align="right">{container.height}</StyledTableCell>
                                    <StyledTableCell align="right">{container.type}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TableWrapper>
        </div>

    );
}
