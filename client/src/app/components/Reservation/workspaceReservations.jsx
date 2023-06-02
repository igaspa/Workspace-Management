import { Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

export default function ActiveReservationCard({ reservation, isActive }) {
  const active = {
    backgroundColor: '#5DA0C1',
    color: 'white'
  };

  return (
    <Card style={isActive ? active : {}}>
      <CardContent sx={{ height: 30 }}>
        <Typography variant="h7" gutterBottom>
          {reservation.user.firstName} {reservation.user.lastName}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography sx={{ paddingTop: 2 }} fontSize={14} gutterBottom>
          {reservation.dateTime}
        </Typography>
      </CardContent>
    </Card>
  );
}

ActiveReservationCard.propTypes = {
  reservation: PropTypes.object
};
