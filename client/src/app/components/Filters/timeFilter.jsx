import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export function TimeFilter({ onChange, hour, hours, required }) {
  return (
    <Box sx={{ width: 90, paddingTop: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" required={required}>
          Hour
        </InputLabel>
        <Select
          required={required}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hour || ''}
          label="Hour"
          onChange={onChange}
          sx={{ fontSize: 14, padding: 0 }}
        >
          {hours.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

TimeFilter.propTypes = {
  onChange: PropTypes.func,
  hour: PropTypes.string,
  hours: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool
};
