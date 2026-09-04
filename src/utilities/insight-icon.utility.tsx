import type { ReactNode } from "react";
import { getVendorCategoryIcon } from "./vendor.utility";
import type { IInsightRecord } from "../interfaces/insight.interface";
import { FALLBACK_VENDOR_CATEGORY } from "../constants/vendor.constants";

const renderCategoryIcon = (icon: string): ReactNode => (
  <img alt="" src={icon} style={{ width: "100%", height: "100%" }} />
);

const getInsightVendorCategory = (record: IInsightRecord) =>
  record.subscription?.vendor?.category ??
  record.transaction?.vendor?.category ??
  FALLBACK_VENDOR_CATEGORY;

export const renderInsightIcon = (record: IInsightRecord): ReactNode =>
  renderCategoryIcon(getVendorCategoryIcon(getInsightVendorCategory(record)));
