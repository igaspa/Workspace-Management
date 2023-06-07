import PropTypes from 'prop-types';
import { Stack, FormControl, Button } from '@mui/material';
import MultipleUserFilter from '../../Users/multipleUserFilter';

const ReservationFormFooter = ({
  users,
  selectedUsers,
  handleParticipantChange,
  handleEmailInputChange,
  allowMultipleParticipants
}) => {
  return (
    <Stack direction="row" display="flex" alignItems="center" justifyContent="flex-end" spacing={1}>
      {allowMultipleParticipants && (
        <FormControl sx={{ p: 1, width: '100%', maxWidth: '320px' }}>
          <MultipleUserFilter
            users={users}
            selectedUsers={selectedUsers}
            handleParticipantChange={handleParticipantChange}
            handleEmailInputChange={handleEmailInputChange}
          />
        </FormControl>
      )}
      <Button type="submit" variant="contained" size="small">
        Submit
      </Button>
    </Stack>
  );
};

ReservationFormFooter.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUsers: PropTypes.array.isRequired,
  handleParticipantChange: PropTypes.func.isRequired,
  handleEmailInputChange: PropTypes.func.isRequired,
  allowMultipleParticipants: PropTypes.bool.isRequired
};

export default ReservationFormFooter;
