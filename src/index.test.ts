import { describe, it, expect } from 'vitest';
import { greet, add, multiply } from './index';

describe('Package Functions', () => {
  it('should greet correctly', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('should add numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should multiply numbers correctly', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});