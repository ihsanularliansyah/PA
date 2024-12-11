import React from 'react';
import { AdminLayout } from './Admin.layout';

const Dashboard = () => {
  return (
    <div>
      <iframe
        src={`${process.env.NEXT_PUBLIC_WAHA_API_URL}/dashboard`}
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
