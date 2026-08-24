export interface IDonutSegment {
  value: number;
  color: string;
}

export interface IDonutArc {
  color: string;
  dashArray: string;
  dashOffset: number;
}

const SEGMENT_GAP = 20;
const MIN_ARC_LENGTH = 14;

export const getDonutArcs = (
  segments: IDonutSegment[],
  radius: number,
): IDonutArc[] => {
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  if (total <= 0) {
    return [];
  }

  const drawableLength = Math.max(
    circumference - SEGMENT_GAP * segments.length,
    0,
  );
  const flooredLengths = segments.map(({ value }) =>
    Math.max((value / total) * drawableLength, MIN_ARC_LENGTH),
  );
  const flooredTotal = flooredLengths.reduce((sum, length) => sum + length, 0);
  const scale =
    flooredTotal > 0 ? Math.min(drawableLength / flooredTotal, 1) : 1;

  let offset = 0;

  return segments.map(({ color }, index) => {
    const arcLength = flooredLengths[index] * scale;

    const arc: IDonutArc = {
      color,
      dashOffset: -offset,
      dashArray: `${arcLength} ${circumference - arcLength}`,
    };

    offset += arcLength + SEGMENT_GAP;

    return arc;
  });
};
