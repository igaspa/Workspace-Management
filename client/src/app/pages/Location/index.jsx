import LocationTable from '../../features/Location/LocationTable';

export default function LocationList () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: 20, paddingBottom: 2 }}>
			<LocationTable />
		</div>
	);
}
