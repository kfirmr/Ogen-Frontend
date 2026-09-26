import { keyframes } from "@emotion/react";
import { createStyles } from "../../../../create-styles";
import { theme } from "../../../../constants/theme.constants";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const stepCard = {
  gap: 16,
  display: "flex",
  minHeight: 282,
  padding: "20px 18px",
  boxSizing: "border-box" as const,
  flexDirection: "column" as const,
};

const resultCard = {
  ...stepCard,
  gap: 10,
  alignItems: "center",
  padding: "26px 22px",
  justifyContent: "center",
  textAlign: "center" as const,
};

const companyMark = {
  display: "flex",
  flex: "0 0 auto",
  fontWeight: 900,
  lineHeight: 1,
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.ink,
  borderRadius: theme.radius.pill,
  backgroundColor: theme.background.fill,
  boxShadow: `0 3px 0 ${theme.border.natural}`,
};

const resultBadge = {
  width: 64,
  height: 64,
  fontSize: 30,
  lineHeight: 1,
  fontWeight: 900,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.white,
  borderRadius: theme.radius.pill,
};

const resultAction = {
  flex: 1,
  fontSize: 16,
  padding: "14px 16px",
};

export const useStyles = () =>
  createStyles({
    card: stepCard,
    centeredCard: { ...resultCard, gap: 12, padding: "28px 22px" },
    connectedCard: {
      ...resultCard,
      backgroundColor: theme.colors.greenTint,
      border: `2px solid ${theme.colors.greenTintBorder}`,
      boxShadow: `0 4px 0 ${theme.colors.greenTintBorder}`,
    },
    invalidCard: {
      ...resultCard,
      padding: "26px 20px",
      boxShadow: `0 4px 0 ${theme.colors.orangeTintShadow}`,
    },
    intro: {
      gap: 4,
      display: "flex",
      flexDirection: "column" as const,
    },
    title: {
      fontSize: 21,
      lineHeight: 1.3,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    description: {
      fontSize: 14.5,
      lineHeight: 1.5,
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
      textWrap: "pretty" as const,
    },
    companyGrid: {
      gap: 10,
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    companyTile: {
      gap: "8px",
      display: "flex",
      borderRadius: "22px",
      padding: "14px 6px 12px",
      flexDirection: "column",
      alignItems: "center",
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
      backgroundColor: theme.colors.white,
      transition: "all .14s ease",
      border: `2px solid ${theme.border.faint}`,
      boxShadow: `0 4px 0 ${theme.shadow.default}`,
      "&:hover": {
        borderColor: theme.colors.green,
        boxShadow: `0 4px 0 ${theme.colors.greenTintBorder}`,
      },
      "&:active": {
        transform: "translateY(4px)",
        boxShadow: `0 0 0 ${theme.colors.greenTintBorder}`,
      },
    },
    companyTileMark: { ...companyMark, width: 44, height: 44, fontSize: 17 },
    companyTileName: {
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1.25,
      textAlign: "center" as const,
    },
    loginHeader: {
      gap: 12,
      display: "flex",
      alignItems: "center",
    },
    backButton: {
      width: 38,
      height: 38,
      flex: "0 0 auto",
      color: theme.colors.ink,
      backgroundColor: theme.background.fill,
      "&:hover": {
        backgroundColor: theme.background.fillHover,
      },
    },
    backGlyph: {
      fontSize: 18,
      lineHeight: 1,
      fontWeight: 800,
    },
    loginHeaderMark: { ...companyMark, width: 40, height: 40, fontSize: 16 },
    loginTitle: {
      flex: 1,
      minWidth: 0,
      fontSize: 19,
      lineHeight: 1.3,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    fieldIcon: {
      width: 32,
      height: 32,
      display: "block",
    },
    errorBox: {
      fontSize: 14,
      fontWeight: 700,
      lineHeight: 1.45,
      borderRadius: 18,
      padding: "10px 14px",
      fontFamily: theme.fonts.body,
      color: theme.colors.orangeDark,
      backgroundColor: theme.colors.orangeTintSoft,
      border: `2px solid ${theme.colors.orangeTint}`,
    },
    connectButton: {
      width: "100%",
      fontSize: 17,
      padding: "15px 20px",
    },
    privacyNote: {
      gap: 6,
      display: "flex",
      fontSize: 13,
      alignItems: "center",
      textAlign: "center" as const,
      justifyContent: "center",
      color: theme.colors.muted,
      fontFamily: theme.fonts.body,
    },
    lockIcon: {
      width: 16,
      height: 16,
      display: "block",
    },
    spinner: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      boxSizing: "border-box",
      border: `7px solid ${theme.colors.greenTintShadow}`,
      borderTopColor: theme.colors.green,
      animation: `${spin} .9s linear infinite`,
    },
    validatingTitle: {
      fontSize: 21,
      marginTop: 4,
      lineHeight: 1.3,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    elapsedPill: {
      fontSize: 13,
      fontWeight: 800,
      padding: "6px 14px",
      color: theme.colors.ink,
      fontFamily: theme.fonts.body,
      borderRadius: theme.radius.pill,
      backgroundColor: theme.background.fill,
    },
    slowNote: {
      fontSize: 13,
      fontWeight: 700,
      fontFamily: theme.fonts.body,
      color: theme.colors.orangeDark,
    },
    connectedBadge: {
      ...resultBadge,
      backgroundColor: theme.colors.green,
      boxShadow: `0 5px 0 ${theme.colors.greenDark}`,
    },
    invalidBadge: {
      ...resultBadge,
      fontSize: 32,
      backgroundColor: theme.colors.orange,
      boxShadow: `0 5px 0 ${theme.colors.orangeDark}`,
    },
    resultTitle: {
      fontSize: 21,
      marginTop: 6,
      color: theme.colors.ink,
      fontFamily: theme.fonts.display,
    },
    xpNote: {
      fontSize: 13,
      width: "100%",
      fontWeight: 800,
      fontFamily: theme.fonts.body,
      color: theme.colors.greenDark,
    },
    connectAnotherButton: {
      marginTop: "8px",
      borderColor: theme.colors.greenTintBorder,
      boxShadow: `0 5px 0 ${theme.colors.greenTintBorder}`,
    },
    resultActions: {
      gap: 10,
      width: "100%",
      marginTop: 10,
      display: "flex",
    },
    retryAction: resultAction,
    pickAnotherAction: {
      ...resultAction,
      color: theme.colors.ink,
      background: theme.colors.white,
    },
  });
