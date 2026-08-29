import type { TVendorCategoryType } from "../constants/vendor.constants";

export interface IVendorSummary {
  id: string;
  name: string;
  category: TVendorCategoryType | null;
}
