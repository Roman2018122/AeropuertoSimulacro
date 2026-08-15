import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Flights = {
  id: number;
  gate_id: string;
  flight_number: string;
  destination: string;
  status: string;
  departure_time: string;
  created_at: string;
};

export async function ListFlightsApi() {
  const { data } = await http.get<Paginated<Flights>>("/api/flights/");
  return data; // { count, next, previous, results }
}

export async function CreateFlightsApi(nombre: string) {
  const { data } = await http.post<Flights>("/api/flights/", { nombre });
  return data;
}
