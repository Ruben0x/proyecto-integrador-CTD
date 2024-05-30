import React from 'react';
import { Skeleton } from '@mui/material';

const MySkeleton = ({ isLoading, children }) => {
  return isLoading? <Skeleton /> : children;
};

export default MySkeleton;