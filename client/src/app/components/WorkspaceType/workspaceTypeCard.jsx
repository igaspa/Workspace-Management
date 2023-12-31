import { Card, CardContent, CardActionArea, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { Duration } from 'luxon';
import { useTheme } from '@emotion/react';

export default function WorkspaceTypeCard({ workspaceType, handleWorkspaceTypeSelect }) {
  const duration = Duration.fromObject(workspaceType.maxReservationInterval);
  const intervalString = duration.toFormat('hh:mm');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: '100%',
        minHeight: 200,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '30%',
          left: '30%',
          right: '30%',
          bottom: '30%',
          backgroundImage: `url(${workspaceType.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          opacity: 0.5
        }
      }}
    >
      <CardActionArea
        onClick={handleWorkspaceTypeSelect}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: 0
        }}
      >
        <CardContent>
          <Typography sx={{ color: '#454545' }}>{workspaceType.name}</Typography>
        </CardContent>

        <CardContent>
          {isMobile ? (
            <Typography sx={{ color: '#454545', fontSize: 14 }}>Max reservation time: {intervalString}</Typography>
          ) : (
            <Typography sx={{ color: '#454545' }}>Max reservation time: {intervalString}h</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

WorkspaceTypeCard.propTypes = {
  workspaceType: PropTypes.object,
  handleWorkspaceTypeSelect: PropTypes.func
};
