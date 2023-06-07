import AreaTable from '../../features/Area/AreaTable';

export default function AreaList() {
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
      <AreaTable />
    </div>
  );
}
