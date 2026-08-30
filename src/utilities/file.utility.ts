import { FILE_SIZE_UNITS_BY_MAGNITUDE } from "../constants/file.constants";

const MIN_DISPLAYED_UNIT_VALUE = 1;

const getFileSizeUnit = (bytes: number) =>
  FILE_SIZE_UNITS_BY_MAGNITUDE.find((unit) => bytes >= unit.divisor) ??
  FILE_SIZE_UNITS_BY_MAGNITUDE[FILE_SIZE_UNITS_BY_MAGNITUDE.length - 1];

export const formatFileSize = (bytes: number): string => {
  const unit = getFileSizeUnit(bytes);
  const scaledSize = Math.max(MIN_DISPLAYED_UNIT_VALUE, bytes / unit.divisor);

  return `${scaledSize.toFixed(unit.decimalPlaces)}${unit.suffix}`;
};
