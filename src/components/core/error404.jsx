import React from 'react';

function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">404 Not Found</h1>
        <p className="text-xl">Sorry, the page you're looking for could not be found. Are you sure you got that right?</p>
      </div>
    </div>
  );
}

export default ErrorPage;
