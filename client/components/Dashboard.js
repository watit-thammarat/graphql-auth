import React from 'react';

import requireAuth from './requireAuth';

const Dashboard = () => {
  return <h1>Dashboard</h1>;
};

export default requireAuth(Dashboard);
