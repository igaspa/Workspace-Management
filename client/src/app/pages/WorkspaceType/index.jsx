import WorkspaceType from '../../features/WorkspaceType/WorkspaceTypeTable';

export default function WorkspaceTypeList() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: 20,
        paddingBottom: 2
      }}
    >
      <WorkspaceType />
    </div>
  );
}
