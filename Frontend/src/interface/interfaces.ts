export interface CustomerTypeDTO {
  id: number;
  name: string;
}

export interface CustomerDTO {
  id: number;
  name: string;
  description?: string | null;
  address: string;
  city: string;
  state: string;
  zips: string;
  lastUpdated: string; // or Date if you parse it
  customerType?: CustomerTypeDTO | null;
}
export interface ResultReponse<T> {
    data: T | null,
    success: boolean,
    message?: string,
}
