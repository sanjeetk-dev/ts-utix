class StringUtils {
  /**
   * Converts a string to kebab-case.
   */
  static kebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .replace(/[\s_]+/g, "-")
      .toLowerCase();
  }

  /**
   * Converts a string to camelCase.
   */
  static camelCase(str: string): string {
    return str
      .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
      .replace(/^./, (char) => char.toLowerCase());
  }

  /**
   * Converts a string to snake_case.
   */
  static snakeCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
      .replace(/[\s-]+/g, "_")
      .toLowerCase();
  }

  /**
   * Generates a UUID v4.
   */
  static UUID(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // UUID v4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10

    return [...bytes]
      .map((byte, i) =>
        ([4, 6, 8, 10].includes(i) ? "-" : "") + byte.toString(16).padStart(2, "0")
      )
      .join("");
  }

  /**
   * Extracts emails from a given text. Supports filtering by specific domains.
   */
  static getEmails(text: string, domains?: string[]): string[] {
    if (!text) return [];

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex) || [];

    // If domains are provided, filter emails based on them
    return domains && domains.length > 0
      ? matches.filter((email) => domains.some((domain) => email.endsWith(`@${domain}`)))
      : matches;
  }
  
}


const StingUtils = {
  getEmails: StringUtils.getEmails,
  UUID: StringUtils.UUID,
  kebabCase: StringUtils.kebabCase,
  camelCase: StringUtils.camelCase,
  snakeCase: StringUtils.snakeCase
}

export {
  StringUtils
}