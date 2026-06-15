const ipCache = new Map<string, number[]>();

/**
 * Basic in-memory IP-based rate limiter.
 *
 * @param ip The client's IP address.
 * @param limit Maximum allowed requests in the window.
 * @param windowMs Time window in milliseconds.
 * @returns true if the client is rate-limited, false otherwise.
 */
export function isRateLimited(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = ipCache.get(ip) || [];

  // Filter out expired timestamps
  const activeTimestamps = timestamps.filter((time) => now - time < windowMs);

  if (activeTimestamps.length >= limit) {
    return true;
  }

  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return false;
}
