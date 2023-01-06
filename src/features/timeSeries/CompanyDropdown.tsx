import { Alert, AlertTitle, Autocomplete, TextField } from '@mui/material';
import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { useGetCompaniesQuery } from '../../services/nasdaq'
import { setSelected } from './timeSeriesSlice';

const CompanyDropdown = () => {
  const {data: companies, error, isLoading } = useGetCompaniesQuery();
  const dispatch = useAppDispatch();

  if (error) {
    console.error(error);
    return (
      <Alert severity="error">
        <AlertTitle>Unfortunately, there was an error</AlertTitle>
        Check console for the details.
      </Alert>
    )
  }

  if (isLoading) return (
    <div>
      Loading companies...
    </div>
  )

  return (
    <Autocomplete
      options={companies!}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="Company" /> }
      onChange={(event, company) => dispatch(setSelected(company))}
    />
  )
}

export default CompanyDropdown