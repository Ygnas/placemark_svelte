export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  admin: boolean;
  _id: string;
}

export interface LoggedInUser {
  email: string;
  token: string;
  _id: string;
}

export interface Category {
  _id?: string;
  title: string;
  userid: string;
}

export interface Placemark {
  name: string;
  description: string;
  latitude: number;
  longitude:number;
  categoryid:  string;
  img?: string[];
  _id?: string;
}

export interface Weather {
  name: string,
  sunrise:  number,
  sunset: number,
  icon: string,
  current: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number,
  }
}
