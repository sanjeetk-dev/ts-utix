export function kebabCase(str: string): string {
    return str
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/[\s_]+/g, "-") 
        .toLowerCase();
}

export function UUID(): string {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes); // Works in both environments

    bytes[6] = (bytes[6] & 0x0f) | 0x40; // UUID v4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10

    return [...bytes]
        .map((byte, i) =>
            ([4, 6, 8, 10].includes(i) ? "-" : "") + byte.toString(16).padStart(2, "0")
        )
        .join("");
}
