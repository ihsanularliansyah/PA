import React from 'react';
import { AdminLayout } from './Admin.layout';

const Dashboard = () => {
  return (
    <div>
      <iframe
        src="http://localhost:3000/dashboard"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default Dashboard;
Dashboard.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
