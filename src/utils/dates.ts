export const SITE_TIME_ZONE = 'America/New_York';

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: SITE_TIME_ZONE,
  }).format(date);
}

export function getEasternYear() {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    timeZone: SITE_TIME_ZONE,
  }).format(new Date());
}

