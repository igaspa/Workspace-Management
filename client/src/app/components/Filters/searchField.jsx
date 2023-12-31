import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

const SearchField = ({ data, name, onChange }) => {
  return (
    <TextField
      data={data}
      name={name}
      sx={{ paddingRight: 1, paddingTop: 0.5 }}
      InputProps={{ sx: { height: 33 } }}
      placeholder="Enter 3 characters"
      onChange={onChange}
      onKeyPress={(e) => {
        e.key === 'Enter' && e.preventDefault();
      }}
    />
  );
};

SearchField.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default SearchField;
