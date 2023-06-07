import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

export function DateFilter({ onChange, date, dates, required }) {
  return (
    <Box sx={{ maxWidth: 120, paddingTop: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" required={required}>
          Date
        </InputLabel>
        <Select
          required={required}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={date}
          label="Date"
          onChange={onChange}
          sx={{ fontSize: 14, padding: 0 }}
        >
          {dates.map((date) => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

DateFilter.propTypes = {
  onChange: PropTypes.func,
  date: PropTypes.string,
  dates: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool
};
