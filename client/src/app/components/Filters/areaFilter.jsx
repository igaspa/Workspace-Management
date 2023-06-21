import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

export default function AreaFilter({ names, handleAreaSelect, areaName }) {
  return (
    <div>
      <FormControl sx={{ minWidth: '100px' }} fullWidth>
        <InputLabel
          sx={{
            height: 45,
            padding: 0,
            marginTop: '-3px',
            fontSize: 14
          }}
        >
          Select Area
        </InputLabel>
        <Select
          value={areaName}
          MenuProps={MenuProps}
          onChange={handleAreaSelect}
          renderValue={(selected) => selected}
          input={<OutlinedInput label="Select Area" />}
          sx={{ fontSize: 14, padding: 0, height: 45 }}
        >
          {names.map((name) => {
            return (
              <MenuItem key={name} value={name}>
                <ListItemText primary={name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
AreaFilter.propTypes = {
  handleAreaSelect: PropTypes.func,
  names: PropTypes.array,
  areaName: PropTypes.string
};
