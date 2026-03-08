export interface TopJob {
  title: string;
  company_name: string;
  app_count: string;
  rank: string;
}

export interface DailyApplication {
  date: string;
  count: string;
}

export interface RunningTotal {
  date: string;
  daily_count: string;
  running_total: string;
}
