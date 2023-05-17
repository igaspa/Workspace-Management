import { CircularProgress, Typography } from '@mui/material';
import { useGetReservationsListQuery, useDeleteReservationMutation } from '../../../api/reservationApiSlice';
import { useNavigate } from 'react-router-dom';
import DeleteButton from '../../../components/Buttons/deleteButton';
import { successToast, errorToast } from '../../../utils/toastifyNotification';
import DefaultTable from '../../../components/Backoffice/table';
import { useState } from 'react';

const columns = [
	{
		id: 'user',
		label: 'User',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'workspace',
		label: 'Workspace',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'dateTime',
		label: 'Duration',
		minWidth: 170,
		align: 'left'
	},
	{
		id: 'actions',
		label: 'Actions',
		minWidth: 170,
		align: 'left'
	}
];

export default function ReservationTable () {
	const [deleteReservation] = useDeleteReservationMutation();
	const role = localStorage.getItem('role');
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setSize(+event.target.value);
		setPage(0);
	};

	const { data: [reservationData, pages] = [], isError, isLoading } = useGetReservationsListQuery({
		...(page && { page: page + 1 }),
		...(size && { size })
	});
	const handleDeleteClick = async (event, id) => {
		event.preventDefault();
		await deleteReservation(id)
			.unwrap()
			.then((response) => {
				successToast(response.message);
			})
			.catch((error) => {
				errorToast(error.data.details);
			});
	};
	const count = pages * size;
	const displayedData = reservationData?.map((el) => {
		const button = <DeleteButton onClick={(event) => handleDeleteClick(event, el.id)} text={'Delete Reservation'} />;
		return {
			id: el.id,
			user: `${el.user.firstName} ${el.user.lastName}`,
			workspace: el.workspace.name,
			dateTime: el.dateTime,
			actions: button
		};
	});
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
							<DefaultTable columns={columns}
								rows={displayedData}
								page={page}
								count={count}
								rowsPerPage={size}
								handleChangePage={handleChangePage}
								handleChangeRowsPerPage={handleChangeRowsPerPage}
								rowsPerPageOptions={[10, 25, 50, 100]}/>
						)
				: navigate('/')}
		</div>
	);
}
