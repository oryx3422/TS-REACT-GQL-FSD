export interface Launch {
  id: string;
  mission_name: string | null;
  launch_date_utc: string | null;
  rocket?: {
    rocket_name: string | null;
  } | null;
}

