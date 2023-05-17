import Equipment from '../../features/Equipment/EquipmentTable';

export default function EquipmentList () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: 20, paddingBottom: 2 }}>
			<Equipment />
		</div>
	);
}
