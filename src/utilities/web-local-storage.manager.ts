export class WebLocalStorageManager {
  public static getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  public static setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      return;
    }
  }

  public static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      return;
    }
  }

  public static getJson<TValue>(
    key: string,
    isValid: (value: unknown) => value is TValue,
  ): TValue | null {
    const raw = this.getItem(key);

    if (raw === null) {
      return null;
    }

    try {
      const parsed: unknown = JSON.parse(raw);

      return isValid(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  public static setJson(key: string, value: unknown): void {
    this.setItem(key, JSON.stringify(value));
  }
}
