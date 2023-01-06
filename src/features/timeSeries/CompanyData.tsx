import { Alert, AlertTitle, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react'
import { useGetTimeSeriesDataByDatasetCodeQuery } from '../../services/nasdaq';
import { Company } from '../../types/Company'
import TimeSeriesChart from './TimeSeriesChart';

type Props = {
  company: Company;
}

const CompanyData = ({ company }: Props) => {
  const { data, error, isFetching } = useGetTimeSeriesDataByDatasetCodeQuery(company.dataset_code);

  if (error) {
    console.error(error);
    return (
      <Alert severity="error">
        <AlertTitle>Unfortunately, there was an error</AlertTitle>
        Check console for the details.
      </Alert>
    )
  }

  if (isFetching) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CircularProgress sx={{ marginRight: '20px' }} />
        <Typography component="div" variant="h4">Loading</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '60%'}}>
      <Typography component="h1" variant="h4" sx={{ marginBottom: '50px' }}>{company.name}</Typography>
      {data && <TimeSeriesChart data={data} />}
    </Box>
  )
}

export default CompanyData