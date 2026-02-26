import data from './data/locations.json';
import { LocationData } from './types';

const locations = data as LocationData;

export function getProvinces(): string[] {
  return locations.provinces.map(p => p.name);
}

export function getDistricts(province: string): string[] {
  const found = locations.provinces.find(
    p => p.name.toLowerCase() === province.toLowerCase()
  );
  if (!found) throw new Error(`Province "${province}" not found`);
  return found.districts.map(d => d.name);
}

export function getSectors(province: string, district: string): string[] {
  const prov = locations.provinces.find(
    p => p.name.toLowerCase() === province.toLowerCase()
  );
  if (!prov) throw new Error(`Province "${province}" not found`);

  const dist = prov.districts.find(
    d => d.name.toLowerCase() === district.toLowerCase()
  );
  if (!dist) throw new Error(`District "${district}" not found`);

  return dist.sectors.map(s => s.name);
}

export function getCells(province: string, district: string, sector: string): string[] {
  const sectors = getSectors(province, district);
  const prov = locations.provinces.find(p => p.name.toLowerCase() === province.toLowerCase())!;
  const dist = prov.districts.find(d => d.name.toLowerCase() === district.toLowerCase())!;
  const sec  = dist.sectors.find(s => s.name.toLowerCase() === sector.toLowerCase());
  if (!sec) throw new Error(`Sector "${sector}" not found`);
  return sec.cells.map(c => c.name);
}

export function getVillages(
  province: string, district: string, sector: string, cell: string
): string[] {
  const prov = locations.provinces.find(p => p.name.toLowerCase() === province.toLowerCase());
  if (!prov) throw new Error(`Province "${province}" not found`);
  const dist = prov.districts.find(d => d.name.toLowerCase() === district.toLowerCase());
  if (!dist) throw new Error(`District "${district}" not found`);
  const sec  = dist.sectors.find(s => s.name.toLowerCase() === sector.toLowerCase());
  if (!sec)  throw new Error(`Sector "${sector}" not found`);
  const cel  = sec.cells.find(c => c.name.toLowerCase() === cell.toLowerCase());
  if (!cel)  throw new Error(`Cell "${cell}" not found`);
  return cel.villages.map(v => v.name);
}