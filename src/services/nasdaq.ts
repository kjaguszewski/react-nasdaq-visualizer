import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Company } from '../types/Company';
import { TimeSeries, TimeSeriesRaw } from '../types/TimeSeries';

export const nasdaqApi = createApi({
  reducerPath: 'nasdaqApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://data.nasdaq.com/api/v3/datasets/' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
      query: () => `?database_code=WIKI&api_key=${process.env.REACT_APP_API_KEY}`,
      transformResponse: (response: { datasets: Company[] }) => {
        return response.datasets.sort((a, b) => {
          if (a.name.toUpperCase() < b.name.toUpperCase()) {
            return -1;
          }
          
          if (a.name.toUpperCase() > b.name.toUpperCase()) {
            return 1;
          }
          
          return 0;
        })
      },
    }),
    getTimeSeriesDataByDatasetCode: builder.query<TimeSeries, string>({
      query: (code) => `WIKI/${code}/data.json?api_key=${process.env.REACT_APP_API_KEY}`,
      transformResponse: (response: { dataset_data: TimeSeriesRaw }) => {
        let labels: string[] = [];
        let data: number[] = [];

        response.dataset_data.data.forEach(element => {
          const dateIndex = response.dataset_data.column_names.indexOf('Date');
          const closeIndex = response.dataset_data.column_names.indexOf('Close');

          labels.push(element[dateIndex] as string);
          data.push(element[closeIndex] as number);
        });

        return {
          labels: labels.reverse(),
          datasets: [{
            label: "Close",
            data: data.reverse()
          }]
        }
      },
    })
  })
})

export const { useGetCompaniesQuery, useGetTimeSeriesDataByDatasetCodeQuery } = nasdaqApi;