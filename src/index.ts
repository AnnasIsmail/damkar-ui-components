/**
 * Contoh fungsi utility untuk package npm
 */
export function greet(name: string): string {
  return `Hello, ${name}!`;
}

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// Export default jika diperlukan
export default {
  greet,
  add,
  multiply
};