class DateTimeUtils {
  /**
   * Parses input into a valid Date object.
   */
  private static parseDate(input: Date | string | number): Date | null {
    if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
    if (typeof input === "string" || typeof input === "number") {
      const date = new Date(input);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  }

  /**
   * Formats a Date object into a specified string format.
   */
  static formatDate = (input: Date | string | number, format: string = "YYYY-MM-DD"): string => {
    const date = this.parseDate(input);
    if (!date) return "Invalid date";

    const pad = (num: number) => num.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return format
      .replace("YYYY", year.toString())
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);
  };

  /**
   * Returns a human-readable relative time (e.g., "2 days ago", "in 3 hours").
   */
  static timeAgo = (input: Date | string | number): string => {
    const date = this.parseDate(input);
    if (!date) return "Invalid date";

    const now = new Date();
    const diff = Math.floor((date.getTime() - now.getTime()) / 1000);
    const isFuture = diff > 0;
    const absDiff = Math.abs(diff);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const count = Math.floor(absDiff / seconds);
      if (count >= 1) {
        const plural = count === 1 ? unit : `${unit}s`;
        return isFuture ? `in ${count} ${plural}` : `${count} ${plural} ago`;
      }
    }

    return "just now";
  };

  /**
   * Checks if a given year is a leap year.
   */
  static isLeapYear = (input: Date | number): boolean => {
    const year = input instanceof Date ? input.getFullYear() : input;
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };


  /**
   * Returns the number of days in a given month and year.
   */
  static getDaysInMonth = (input: Date | number, month?: number): number => {
    let year: number;

    if (input instanceof Date) {
      year = input.getFullYear();
      month = input.getMonth() + 1; // Months are 0-based in JS, so we add 1
    } else if (typeof input === "number" && typeof month === "number") {
      if (month < 1 || month > 12) return 0;
      year = input;
    } else {
      return 0; // Invalid input
    }

    return new Date(year, month, 0).getDate();
  };


  /**
   * Adds or subtracts days from a given date.
   */
  static addDays = (input: Date | string | number, days: number): string | Date => {
    const date = this.parseDate(input);
    if (!date) return "Invalid date";

    date.setDate(date.getDate() + days);
    return date;
  };

  /**
   * Calculates the difference between two dates in various time units.
   */
  static timeDifference = (input1: Date | string | number, input2: Date | string | number) => {
    const date1 = this.parseDate(input1);
    const date2 = this.parseDate(input2);
    if (!date1 || !date2) return "Invalid date";

    const diffMs = Math.abs(date2.getTime() - date1.getTime());

    return {
      days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diffMs / (1000 * 60)) % 60),
      seconds: Math.floor((diffMs / 1000) % 60),
    };
  };
}

// Export all functions as an object for destructuring
const DateTime = {
  formatDate: DateTimeUtils.formatDate,
  timeAgo: DateTimeUtils.timeAgo,
  isLeapYear: DateTimeUtils.isLeapYear,
  getDaysInMonth: DateTimeUtils.getDaysInMonth,
  addDays: DateTimeUtils.addDays,
  timeDifference: DateTimeUtils.timeDifference,
};

export { DateTime };
