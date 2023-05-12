import Equipment from '../../features/Equipment/EquipmentList';
import CreateEquipment from '../../features/Equipment/CreateEquipment';

export default function EquipmentList () {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', paddingTop: 20, paddingBottom: 2 }}>
			<Equipment />
			<CreateEquipment />
		</div>
	);
}
