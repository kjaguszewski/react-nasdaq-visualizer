export type TimeSeries = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export type TimeSeriesRaw = {
  column_names: string[];
  start_date: string;
  end_date: string;
  data: (string | number)[][];
  order: string;
}