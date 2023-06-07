import * as React from 'react';
import { Card, CardHeader, CardContent, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {
  return (
    <Card>
      <CardHeader title={`${user.firstName} ${user.lastName}`} />
      <CardContent spacing={1}>
        <Link to={user.id}>
          <Button variant="contained">Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
