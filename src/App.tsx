import React from 'react';
import './App.css';
import { AppBar, Box, CssBaseline, styled, Typography } from '@mui/material';
import CompanyDropdown from './features/timeSeries/CompanyDropdown';
import CompanyData from './features/timeSeries/CompanyData';
import { useAppSelector } from './app/hooks';

const CompanyContainer = styled(Box)`
  padding: 150px 50px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

function App() {
  const selectedCompany = useAppSelector(state => state.timeSeries.selected);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ padding: '10px 30px', backgroundColor: 'white' }} color="transparent">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
          >
            Nasdaq Data Visualizer
          </Typography>
          <Box sx={{ maxWidth: '500px', flexGrow: '1', marginLeft: 'auto' }}>
            <CompanyDropdown />
          </Box>
        </Box>
      </AppBar>
      <CompanyContainer>
        {!selectedCompany ? (
          <Typography component="div" variant="h4" color="grey">Please select a company</Typography>
        ) : (
          <CompanyData company={selectedCompany} />
        )}
      </CompanyContainer>
    </Box>
  );
}

export default App;
