import type { IFileSizeUnit } from "../interfaces/file.interface";

export const FILE_SIZE_UNITS = {
  KILOBYTE: 1024,
  MEGABYTE: 1024 * 1024,
  GIGABYTE: 1024 * 1024 * 1024,
} as const;

export const FILE_SIZE_UNITS_BY_MAGNITUDE: IFileSizeUnit[] = [
  { suffix: "GB", divisor: FILE_SIZE_UNITS.GIGABYTE, decimalPlaces: 1 },
  { suffix: "MB", divisor: FILE_SIZE_UNITS.MEGABYTE, decimalPlaces: 1 },
  { suffix: "KB", divisor: FILE_SIZE_UNITS.KILOBYTE, decimalPlaces: 0 },
];
