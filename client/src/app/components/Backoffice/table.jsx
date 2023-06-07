import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PropTypes from 'prop-types';
import styles from '../../CSS/Table.Module.css';
import clsx from 'clsx';

export default function DefaultTable({
  columns,
  rows,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  handleChangePage,
  handleChangeRowsPerPage,
  count
}) {
  return (
    <Paper className={styles.tablePaper}>
      <TableContainer className={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  className={clsx(styles.thead, styles.tbody)}
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
            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
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
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
