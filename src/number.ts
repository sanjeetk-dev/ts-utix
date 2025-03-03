class NumberUtils {
  private static readonly units: Record<"K" | "M" | "B", number> = {
    K: 1_000,
    M: 1_000_000,
    B: 1_000_000_000,
  };

  static formatNumber(num: number, unit: "K" | "M" | "B" | "" = ""): string {
    if (unit && num < NumberUtils.units[unit]) return num.toString();

    const format = (value: number, suffix: keyof typeof NumberUtils.units) => {
      const formatted = (value / NumberUtils.units[suffix]).toFixed(1);
      return formatted.endsWith(".0")
        ? `${Math.floor(value / NumberUtils.units[suffix])}${suffix}`
        : `${formatted}${suffix}`;
    };

    if (unit in NumberUtils.units) return format(num, unit as keyof typeof NumberUtils.units);
    if (num >= NumberUtils.units.B) return format(num, "B");
    if (num >= NumberUtils.units.M) return format(num, "M");
    if (num >= NumberUtils.units.K) return format(num, "K");

    return num.toString();
  }

  static addCommas(num: number): string {
    return num.toLocaleString();
  }

  static round(num: number, decimals: number = 2): number {
    return parseFloat(num.toFixed(decimals));
  }

  static abbreviateCurrency(num: number, currencySymbol: string = "$"): string {
    const formattedNumber = NumberUtils.formatNumber(num);
    return `${currencySymbol}${formattedNumber}`;
  }

  static randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  static gcd(a: number, b: number): number {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return Math.abs(a);
  }

  static lcm(a: number, b: number): number {
    return Math.abs(a * b) / NumberUtils.gcd(a, b);
  }

  static factorial(num: number): number {
    if (num < 0) throw new Error("Factorial is not defined for negative numbers.");
    return num === 0 ? 1 : num * NumberUtils.factorial(num - 1);
  }

  static isEven(num: number): boolean {
    return num % 2 === 0;
  }

  static isOdd(num: number): boolean {
    return num % 2 !== 0;
  }

  static convertToRoman(num: number): string {
    const romanNumerals: [number, string][] = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
    ];
    
    let result = "";
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  }

  static fromRoman(roman: string): number {
    const romanToNum: Record<string, number> = {
      M: 1000, D: 500, C: 100, L: 50,
      X: 10, V: 5, I: 1
    };

    let total = 0;
    let prevValue = 0;
    
    for (const char of roman) {
      const value = romanToNum[char];
      total += value > prevValue ? value - 2 * prevValue : value;
      prevValue = value;
    }
    
    return total;
  }

  static convertBase(num: number, fromBase: number, toBase: number): string {
    return parseInt(num.toString(), fromBase).toString(toBase);
  }

  static isPerfectSquare(num: number): boolean {
    return Math.sqrt(num) % 1 === 0;
  }

  static fibonacci(n: number): number {
    if (n < 0) throw new Error("Fibonacci is not defined for negative numbers.");
    return n <= 1 ? n : NumberUtils.fibonacci(n - 1) + NumberUtils.fibonacci(n - 2);
  }

  static sumOfDigits(num: number): number {
    return Math.abs(num).toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  static reverseNumber(num: number): number {
    const reversed = parseInt(num.toString().split("").reverse().join(""));
    return num < 0 ? -reversed : reversed;
  }

  static countDigits(num: number): number {
    return Math.abs(num).toString().length;
  }
}

// Export as an object for easy destructuring
export const NumberUtility = {
  formatNumber: NumberUtils.formatNumber,
  addCommas: NumberUtils.addCommas,
  round: NumberUtils.round,
  abbreviateCurrency: NumberUtils.abbreviateCurrency,
  randomNumber: NumberUtils.randomNumber,
  isPrime: NumberUtils.isPrime,
  gcd: NumberUtils.gcd,
  lcm: NumberUtils.lcm,
  factorial: NumberUtils.factorial,
  isEven: NumberUtils.isEven,
  isOdd: NumberUtils.isOdd,
  convertToRoman: NumberUtils.convertToRoman,
  fromRoman: NumberUtils.fromRoman,
  convertBase: NumberUtils.convertBase,
  isPerfectSquare: NumberUtils.isPerfectSquare,
  fibonacci: NumberUtils.fibonacci,
  sumOfDigits: NumberUtils.sumOfDigits,
  reverseNumber: NumberUtils.reverseNumber,
  countDigits: NumberUtils.countDigits,
};

export default NumberUtils;
