/**
 * Converts a backend Time (bigint nanoseconds since epoch) to a human-readable date string.
 */
export function formatModDate(nanoseconds: bigint): string {
  const milliseconds = Number(nanoseconds / 1_000_000n);
  const date = new Date(milliseconds);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
