export function formatTimeToHHMM(time: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(time);
}