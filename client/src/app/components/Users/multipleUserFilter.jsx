import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const MultipleUserFilter = ({ users, selectedUsers, handleParticipantChange, handleEmailInputChange }) => {
  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={users}
      value={selectedUsers}
      onChange={handleParticipantChange}
      getOptionLabel={(option) => `${option.email}`}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Additional Participants"
          placeholder="Enter 3 characters"
          onChange={handleEmailInputChange}
        />
      )}
    />
  );
};

MultipleUserFilter.propTypes = {
  users: PropTypes.array,
  selectedUsers: PropTypes.array,
  handleParticipantChange: PropTypes.func,
  handleEmailInputChange: PropTypes.func
};

export default MultipleUserFilter;
