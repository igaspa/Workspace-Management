import { useGetWorkspaceTypesListQuery } from '../../../api/workspaceTypeApiSlice';
import {
	CircularProgress,
	Typography,
	Stack
} from '@mui/material';
import WorkspaceTypeCard from '../../../components/WorkspaceType/workspaceTypeCard';

const WorkspaceTypeList = () => {
	const { data = [], isError, isLoading } = useGetWorkspaceTypesListQuery();

	return (
		<div>
			{isLoading
				? (
					<CircularProgress />
				)
				: isError
					? (
						<Typography color="error">Failed to load workspace types.</Typography>
					)
					: (
						<Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
							{data.map((workspaceType) => (
								<WorkspaceTypeCard key={workspaceType.id} workspaceType={workspaceType} />
							))}
						</Stack>
					)}
		</div>
	);
};

export default WorkspaceTypeList;
