import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#009FD4',
		color: theme.palette.common.black
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

export default function DefaultTable ({ columns, rows, page, rowsPerPage, rowsPerPageOptions, handleChangePage, handleChangeRowsPerPage, count }) {
	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table" color="grey">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<StyledTableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</StyledTableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.map((row) => {
								return (
									<TableRow hover role="checkbox" key={row.id}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === 'number'
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions}
				component="div"
				count={count}
				rowsPerPage={rowsPerPage}
				page={ page}
				onPageChange={handleChangePage}
				onRowsPerPageChange ={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}

DefaultTable.propTypes = {
	columns: PropTypes.array,
	rows: PropTypes.array,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
	count: PropTypes.number,
	rowsPerPageOptions: PropTypes.array,
	handleChangePage: PropTypes.func,
	handleChangeRowsPerPage: PropTypes.func
};
