import * as React from 'react';

const LocalError = ({ error }) => {
  if (error) {
    return <div className="text-danger" role='alert'>{error}</div>;
  }
  return <div />;
};

export default LocalError;
