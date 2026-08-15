import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem } from "@mui/material";

import { type Flights, ListFlightsApi, CreateFlightsApi } from "../api/flights.api";

export default function FlightsPage() {
  const [items, setItems] = useState<Flights[]>([]);
  const [gate_id, setGate_id] = useState("");
  const [flight_number, setFlight_number] = useState("");
  const [destination, setDestination] =  useState("");
  const [status, setStatus] = useState("");
  const [departure_time, setDeparture_time] = useState("");
  const [created_at, setCreated_at] = useState("");
  

  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listFlightsApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar la lista. ¿Backend encendido?");
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!gate_id) return setError("requiere gate");
      if (!flight_number.trim()) return setError("flight number requerido");

      await CreateFlightsApi(
      
      string(gate_id),
      String(flight_number),
      String(destination),
      String(status),
      String(departure_time),
      String(created_at),
      );

      setGate_id("");
      setFlight_number("");
      setDestination("");
      setStatus(""); 
      setDeparture_time(""); 
      setCreated_at(""); 
    
      await load();

      } catch {
        setError("No se pudo guardar flight. ¿Token admin?");
      }       
    };

  return (
    <Container  sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}> Crear flight </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Stack spacing={2} sx={{ mb: 2 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} >
              <TextField label="Gate" value={gate_id} onChange={(e) => setGate_id(e.target.value)}sx={{ width: 200 }} />
              <TextField label="Flight #"  value={flight_number} onChange={(e) => setFlight_number(e.target.value)}sx={{ width: 200 }}/>
              <TextField label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)}sx={{ width: 200 }} />
              <TextField label="Status"  value={status} onChange={(e) => setStatus(e.target.value)}sx={{ width: 200 }}/>
              <TextField label="Departure time" value={departure_time} onChange={(e) => setDeparture_time(e.target.value)}sx={{ width: 200 }} />
              <TextField label="Created at"  value={created_at} onChange={(e) => setCreated_at(e.target.value)}sx={{ width: 200 }}/>
            
              
              <Button variant="contained" onClick={save}> Guardar</Button>
            </Stack> 
         </Stack>


        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5">Lista de flights</Typography>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Gate</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Departure time</TableCell>
              <TableCell>Created at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.id}</TableCell>
                <TableCell>{f.gate_id}</TableCell>
                <TableCell>{f.flight_number}</TableCell>
                <TableCell>{f.status}</TableCell>
                <TableCell>{f.departure_time}</TableCell>
                <TableCell>{f.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}