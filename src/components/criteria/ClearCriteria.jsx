import React from 'react';
import { Button } from '../ui/button';

const ClearCriteria = ({ handleCriteria }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div>Your criteria did not match any products.</div>
      <Button onClick={handleCriteria}>Clear Criteria</Button>
    </div>
  );
};

export default ClearCriteria;
