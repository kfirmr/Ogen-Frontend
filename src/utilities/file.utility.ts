const BYTES_PER_KILOBYTE = 1024;

export const formatFileSize = (bytes: number): string =>
  `${Math.max(1, Math.round(bytes / BYTES_PER_KILOBYTE))}KB`;
