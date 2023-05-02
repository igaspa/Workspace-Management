import { useGetUsersListQuery } from '../../../api/usersApiSlice';
import {
	CircularProgress,
	Typography,
	Stack
} from '@mui/material';
import UserCard from '../../../components/Users/UserCard';

const UsersList = () => {
	const { data = [], isError, isLoading } = useGetUsersListQuery();

	return (
		<div>
			{isLoading
				? (
					<CircularProgress />
				)
				: isError
					? (
						<Typography color="error">Failed to load users.</Typography>
					)
					: (
						<Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
							{data.map((user) => (
								<UserCard key={user.id} user={user} />
							))}
						</Stack>
					)}
		</div>
	);
};

export default UsersList;
