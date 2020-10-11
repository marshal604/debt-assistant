import * as chartjs from 'chart.js';
import { ChartData } from 'react-chartjs-2';

export interface GroupDetailChartState {
  debt: ChartData<chartjs.ChartData>;
  lend: ChartData<chartjs.ChartData>;
}
