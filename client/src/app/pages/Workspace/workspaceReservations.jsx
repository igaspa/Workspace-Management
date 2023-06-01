import { useParams } from 'react-router-dom';

const WorkspaceReservations = () => {
  const { workspaceId } = useParams();

  return <div>{workspaceId}</div>;
};

export default WorkspaceReservations;
