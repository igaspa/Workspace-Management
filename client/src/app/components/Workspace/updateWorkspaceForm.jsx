import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAreaListQuery } from '../../api/areaApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../utils/errors';

const WorkspaceForm = ({ workspace, onSave, onCancel }) => {
	const navigate = useNavigate();

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setFormData((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const [formData, setFormData] = useState({
		name: workspace.name,
		typeId: workspace.workspaceType.id,
		areaId: workspace.area.id
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const changedData = {};
		Object.entries(formData).forEach(([key, value]) => {
			if (value !== workspace[key]) {
				changedData[key] = value;
			}
		});
		onSave(changedData);
	};

	const { data: areas = [], isError: isAreaError, error: areaErrorObject, isLoading: isAreaLoading } = useGetAreaListQuery();

	const { data: [workspaceTypes] = [], isError: isWorkspaceTypesError, error: workspaceTypeErrorObject, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery();

	useEffect(() => {
		if (isWorkspaceTypesError) {
			const authorizationError = errorHandler(workspaceTypeErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (isAreaError) {
			const authorizationError = errorHandler(areaErrorObject);
			if (authorizationError) navigate('/sign-in');
		}
		if (workspaceTypes && areas) {
			if (workspaceTypes.length && areas.length) {
				setFormData((prevState) => ({
					...prevState
				}));
			}
		}
	}, [workspaceTypes, areas]);

	if (isAreaLoading || isWorkspaceTypesLoading) {
		return <CircularProgress />;
	}

	return (
		<>
			{(areas && workspaceTypes) &&
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: '300px'
			}}
		>

			<TextField fullWidth
				sx = {{ marginTop: 2 }}
				label="Name"
				required
				name="name"
				value={formData.name || ''}
				onChange={handleChange}
			/>

			<FormControl fullWidth sx = {{ marginTop: 2 }}>
				<InputLabel id="select-area">Select Area</InputLabel>
				<Select
					labelId="select-area"
					label="Select Area"
					onChange={handleChange}
					sx={{ textAlign: 'left' }}
					required
					value={formData.areaId || ''}
					name="areaId"
				>
					{areas.map((area) => (
						<MenuItem key={area.id} value={area.id}>
							{area.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<FormControl fullWidth sx = {{ marginTop: 2 }}>
				<InputLabel id="select-workspace-type">Workspace Type</InputLabel>
				<Select
					labelId="select-workspace-type"
					label="Select Workspace Type"
					onChange={handleChange}
					sx={{ textAlign: 'left' }}
					required
					value={formData.typeId || ''}
					name="typeId"
				>
					{workspaceTypes.map((workspaceType) => (
						<MenuItem key={workspaceType.id} value={workspaceType.id}>
							{workspaceType.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<Button type="submit" sx = {{ marginTop: 2, border: '1px solid #333', fontSize: 11 }}> <strong>Save</strong></Button>
			<Button sx = {{ marginTop: 2, border: '1px solid #333', fontSize: 11 }} onClick={onCancel}><strong>Cancel</strong></Button>

		</Box>
			}
		</>
	);
};

WorkspaceForm.propTypes = {
	workspace: PropTypes.object,
	onSave: PropTypes.func,
	onCancel: PropTypes.func
};

export default WorkspaceForm;
