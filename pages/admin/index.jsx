import React, { useEffect } from 'react';

function Index() {
  useEffect(() => {
    location.href = '/api/auth/login';
  }, []);
  return (
    <div className="text-center text-lg font-semibold my-28">
      conecting to kinde..
    </div>
  );
}

export default Index;
