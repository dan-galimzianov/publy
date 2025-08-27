export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 500,
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (
        err instanceof Error &&
        'status' in err &&
        (err as { status: number }).status === 429
      ) {
        const wait = delay * Math.pow(2, i);
        console.warn(`Rate limit hit, retrying in ${wait}ms...`);
        await new Promise((r) => setTimeout(r, wait));
      } else {
        throw err;
      }
    }
  }
  throw new Error('Too many retries');
}
