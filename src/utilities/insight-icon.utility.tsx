import {
  VENDOR_CATEGORY_ICONS,
  FALLBACK_VENDOR_CATEGORY,
} from "../constants/vendor.constants";

import type { ReactNode } from "react";
import type { IInsightRecord } from "../interfaces/insight.interface";

const renderCategoryIcon = (icon: string): ReactNode => (
  <img alt="" src={icon} style={{ width: "100%", height: "100%" }} />
);

const getInsightVendorCategory = (record: IInsightRecord) =>
  record.subscription?.vendor?.category ??
  record.transaction?.vendor?.category ??
  FALLBACK_VENDOR_CATEGORY;

export const renderInsightIcon = (record: IInsightRecord): ReactNode =>
  renderCategoryIcon(VENDOR_CATEGORY_ICONS[getInsightVendorCategory(record)]);
