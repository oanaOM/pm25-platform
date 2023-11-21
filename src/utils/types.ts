export interface Projects {
  projects: string[];
}

export interface ErrorAPI {
  error: {
    message: string;
  };
}

export interface Project {
  source: string;
  c_d0_source: string;
  num_of_records: number;
  feeds: Feed[];
  version: string;
}

export interface Feed {
  time: string;
  SiteName: string;
  app: string;
  area: string;
  date: string;
  gps_alt: number;
  gps_fix: number;
  gps_lat: number;
  gps_lon: number;
  gps_num: number;
  name: string;
  s_d0: number;
  s_d1: number;
  s_d2: number;
  s_h0: number;
  s_t0: number;
  // TODO: this should be date type
  timestamp: string;
  device_id: string;
  c_d0: number;
  c_d0_method: string;
}
