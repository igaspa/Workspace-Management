import { useGetUserQuery } from '../../../api/usersApiSlice';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Stack } from '@mui/material';
import UserDetailsCard from '../../../components/Users/userDetailsCard';

const UserDetails = () => {
  const { userId } = useParams();
  const { data = {}, isError, isLoading } = useGetUserQuery(userId);

  console.log(data, isError, isLoading);

  return (
    // element using material design react library showing name of the user and edit button
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Typography color="error">Failed to load users.</Typography>
      ) : (
        <Stack spacing={2} direction="column" useflexgap={true.toString()} flexWrap="wrap">
          <UserDetailsCard key={data.userId} user={data} />
        </Stack>
      )}
    </div>
  );
};

export default UserDetails;
