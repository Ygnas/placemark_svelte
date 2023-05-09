export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
  placemarks?: Placemark[];
}

export interface Placemark {
  name: string;
  description: string;
  latitude: number;
  longitude:number;
  categoryid:  string;
}
