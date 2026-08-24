import type { CSSProperties } from "react";

export const BORDER_RADIUS = {
  ROUND: {
    borderRadius: "50%",
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "50%",
  },

  LEFT_ROUND_RIGHT_FLAT: {
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "0px",
    borderBottomLeftRadius: "50%",
    borderBottomRightRadius: "0px",
  },

  RIGHT_ROUND_LEFT_FLAT: {
    borderTopLeftRadius: "0px",
    borderTopRightRadius: "50%",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "50%",
  },
} as const satisfies Record<string, CSSProperties>;
