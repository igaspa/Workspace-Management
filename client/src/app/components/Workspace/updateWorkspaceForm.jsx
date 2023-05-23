import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Chip, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate } from 'uuid';
import { useGetAreaListQuery } from '../../api/areaApiSlice';
import { useGetEquipmentsListQuery } from '../../api/equipmentApiSlice';
import { useGetWorkspaceTypesListQuery } from '../../api/workspaceTypeApiSlice';
import { errorHandler } from '../../utils/errors';

const WorkspaceForm = ({ workspace, onSave, onCancel }) => {
	const navigate = useNavigate();

	const initialEquipment = () => {
		const initialEquipment = workspace.equipment.map((eq) => {
			return {
				id: eq.id,
				quantity: eq.workspaceEquipment.quantity
			};
		});
		return initialEquipment;
	};
	const [currentEquipment, setEquipment] = useState(initialEquipment);

	const [allowMultiple, setAllowMultiple] = useState(!workspace.participantLimit || workspace.participantLimit > 1);

	const handleEquipmentChange = (event) => {
		const { target: { value } } = event;
		const newEl = value.slice(-1)[0];

		const newEquipmentQuantity = [...currentEquipment];

		// find if any element id is same as the newly added
		const found = newEquipmentQuantity.find((el) => (el.id === newEl));

		// if there are no elements with newly adding id, add that element to the list, otherwise increase quantity by 1
		if (!found) {
			newEquipmentQuantity.push({ id: newEl, quantity: 1 });
		} else {
			newEquipmentQuantity.map((el) => {
				if (el.id === newEl) {
					el.quantity += 1;
				}
				return el;
			});
		}

		setEquipment(newEquipmentQuantity);
	};

	const handleDelete = (id) => {
		const newEquipmentQuantity = [...currentEquipment];
		const index = newEquipmentQuantity.findIndex((el) => el.id === id);
		if (index !== -1) {
			newEquipmentQuantity[index].quantity -= 1;
			if (newEquipmentQuantity[index].quantity === 0) {
				newEquipmentQuantity.splice(index, 1);
			}
		}
		setEquipment(newEquipmentQuantity);
	};

	const handleTypeChange = (name, value) => {
		const selectedType = workspaceTypes.find(el => el.id === value);
		if (!selectedType.allowMultipleParticipants) delete formData.participantLimit;
		else formData.participantLimit = null;
		setAllowMultiple(selectedType.allowMultipleParticipants);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (name === 'typeId') handleTypeChange(name, value);
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

	const calculateAddedAndRemovedItemLists = (formData) => {
		const oldWorkspaceEquipment = workspace.equipment.map(eq => {
			return {
				id: eq.id,
				quantity: eq.workspaceEquipment.quantity
			};
		});

		const addedAccessories = currentEquipment.filter(newItem => !oldWorkspaceEquipment.some(oldItem => oldItem.id === newItem.id));

		const removedAccessories = oldWorkspaceEquipment.filter(newItem => !currentEquipment.some(oldItem => oldItem.id === newItem.id));

		const updatedAccessories = currentEquipment.filter(el1 => {
			const item = oldWorkspaceEquipment.find(el2 => el2.id === el1.id);
			return item && el1.quantity !== item.quantity;
		});

		if (addedAccessories.length) formData.addedAccessories = addedAccessories;
		if (removedAccessories.length) formData.removedAccessories = removedAccessories;
		if (updatedAccessories.length) formData.updatedAccessories = updatedAccessories;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const changedData = {};
		Object.entries(formData).forEach(([key, value]) => {
			if (value !== workspace[key]) {
				changedData[key] = value;
			}
		});
		calculateAddedAndRemovedItemLists(changedData);
		onSave(changedData);
	};

	const { data: [areas] = [], isError: isAreaError, error: areaErrorObject, isLoading: isAreaLoading } = useGetAreaListQuery();

	const { data: [workspaceTypes] = [], isError: isWorkspaceTypesError, error: workspaceTypeErrorObject, isLoading: isWorkspaceTypesLoading } = useGetWorkspaceTypesListQuery();

	const { data: [equipment] = [], isError: isEquipmentError, error: equipmentErrorObject, isLoading: isEquipmentsLoading } = useGetEquipmentsListQuery({});

	const validateError = (errorObj) => {
		const authorizationError = errorHandler(errorObj);
		if (authorizationError) navigate('/sign-in');
	};

	useEffect(() => {
		if (isWorkspaceTypesError) validateError(workspaceTypeErrorObject);
		if (isAreaError) validate(areaErrorObject);
		if (isEquipmentError) validateError(equipmentErrorObject);
	}, [workspaceTypes, areas, equipment]);

	if (isAreaLoading || isWorkspaceTypesLoading || isEquipmentsLoading) {
		return <CircularProgress />;
	}

	return (
		<>
			{(areas && workspaceTypes && equipment?.length) &&

		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minWidth: 400,
				maxWidth: '100%'
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

			{allowMultiple &&
				<FormControl fullWidth sx = {{ marginTop: 2 }}>
					<TextField
						fullWidth
						id="participantLimit"
						name="participantLimit"
						onChange={handleChange}
						margin="normal"
						label="Participant limit (leave empty for unlimited)"
						defaultValue={null}
						type="number"
						inputProps={{ min: 1 }}
					/>
				</FormControl>
			}

			<FormControl fullWidth sx={{ marginTop: 2 }}>
				<InputLabel id="multiple-chip-label">Accessories</InputLabel>
				<Select
					labelId="multiple-chip-label"
					id="multiple-chip"
					multiple
					value={currentEquipment}
					onChange={handleEquipmentChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
							{selected.map((currEq) => {
								const eq = equipment.find(eq => eq.id === currEq.id);
								return <Chip key={eq.id} label={`${eq.name} - ${currEq.quantity}`} onDelete={(event) => handleDelete(eq.id)}
									onMouseDown={(event) => event.stopPropagation()}
								/>;
							})}
						</Box>
					)}
				>

					{equipment.map((eq) => (
						<MenuItem key={eq.id} value={eq.id}>
							{/* <Checkbox checked={currentEquipment.includes(eq.id)} /> */}
							{eq.name}
						</MenuItem>
					))}

				</Select>
			</FormControl>

			<Button fullWidth type="submit" sx = {{ marginTop: 2, border: '1px solid #333', fontSize: 11 }}> <strong>Save</strong></Button>
			<Button fullWidth sx = {{ marginTop: 2, border: '1px solid #333', fontSize: 11 }} onClick={onCancel}><strong>Cancel</strong></Button>

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
