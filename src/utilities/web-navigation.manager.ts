import { buildMailtoLink } from "./mail.utility";
import type { ICancellationEmail } from "../interfaces/subscription-cancellation.interface";

export class WebNavigationManager {
  public static openMail(email: ICancellationEmail): void {
    window.location.assign(buildMailtoLink(email));
  }

  public static openUrl(url: string): void {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  public static dial(phone: string): void {
    window.location.assign(`tel:${phone}`);
  }
}
