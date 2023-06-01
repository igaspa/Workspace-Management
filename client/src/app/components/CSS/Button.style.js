const sharedStyles = {
	fontSize: 11
};

export const buttonPadding = {
	padding: 0.5
};

export const backofficeButtonPadding = {
	paddingLeft: 3
};

export const updateButtonStyle = {
	background: '#FF6347',
	...sharedStyles,
	':hover': {
		background: '#9090C0'
	}
};

export const backofficeButtonStyle = {
	background: '#34495E',
	...sharedStyles,
	':hover': {
		background: '#333'
	}
};

export const searchButtonStyle = {
	background: '#9090C0',
	...sharedStyles,
	':hover': {
		background: '#9090C0'
	}
};

export const deleteButtonStyle = {
	background: '#4A646C',
	...sharedStyles,
	':hover': {
		background: '#36454F'
	}
};

export const createButtonStyle = {
	background: '#54626F',
	...sharedStyles,
	':hover': {
		background: '#98AFC7'
	}
};

export const confirmButtonStyle = {
	background: '#333',
	...sharedStyles,
	':hover': {
		background: '#3787b5'
	}
};

export const cancelButtonStyle = {
	background: '#34495E',
	...sharedStyles,
	':hover': {
		background: '#1978D4'
	}
};
