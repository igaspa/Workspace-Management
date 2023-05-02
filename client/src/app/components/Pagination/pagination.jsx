import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export function BasicPagination ({ count, page, onChange }) {
	return (
		<Stack spacing={2}>
			<Pagination count={count} page={page} onChange={onChange} />
		</Stack>
	);
}

BasicPagination.propTypes = {
	count: PropTypes.number,
	page: PropTypes.number,
	onChange: PropTypes.func
};
