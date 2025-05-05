export function unixTimestampNsToDate(timestampNs) {
    const timestampMs = timestampNs / 1_000_000;
    return new Date(timestampMs);
}
