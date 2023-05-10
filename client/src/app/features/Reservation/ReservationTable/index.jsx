import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { CircularProgress, Typography } from '@mui/material';
import { useGetReservationsListQuery } from '../../../api/reservationApiSlice';
import { useNavigate } from 'react-router-dom';

const columns = [
	{ id: 'name', label: 'Workspace', minWidth: 170 },
	{ id: 'code', label: 'User', minWidth: 100 },
	{
		id: 'startTime',
		label: 'Start Time',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US')
	},
	{
		id: 'endTime',
		label: 'End Time',
		minWidth: 170,
		align: 'right',
		format: (value) => value.toLocaleString('en-US')
	}
];

export default function ReservationTable () {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const { data: [reservationData] = [], isError, isLoading } = useGetReservationsListQuery();
	const role = localStorage.getItem('role');
	const navigate = useNavigate();

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<div>
			{ role.includes('Administrator')
				? isLoading
					? (
						<CircularProgress />
					)
					: isError
						? (
							<Typography color="error">Failed to load reservations.</Typography>
						)
						: (
							<Paper sx={{ width: '100%', overflow: 'hidden' }}>
								<TableContainer sx={{ maxHeight: 440 }}>
									<Table stickyHeader aria-label="sticky table">
										<TableHead>
											<TableRow>
												{columns.map((column) => (
													<TableCell
														key={column.id}
														align={column.align}
														style={{ minWidth: column.minWidth }}
													>
														{column.label}
													</TableCell>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{reservationData
												.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
												.map((row) => {
													return (
														<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
															<TableCell align="left">
																{row.workspace.name}
															</TableCell>
															<TableCell align="left">
																{`${row.user.firstName} ${row.user.lastName}`}
															</TableCell>
															<TableCell align="right">
																{new Date(row.startAt).toLocaleString('en-US')}
															</TableCell>
															<TableCell align="right">
																{new Date(row.endAt).toLocaleString('en-US')}
															</TableCell>
														</TableRow>
													);
												})}
										</TableBody>

									</Table>
								</TableContainer>
								<TablePagination
									rowsPerPageOptions={[10, 25, 100]}
									component="div"
									count={reservationData.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</Paper>)
				: navigate('/')}
		</div>
	);
}
