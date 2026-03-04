const timezoneName = 'Africa/Cairo';

const formatterOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'Africa/Cairo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

function getPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes): string {
  return parts.find((p) => p.type === type)!.value;
}

export function now(): Date {
  const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);
  const parts = formatter.formatToParts(new Date());

  const year = Number(getPart(parts, 'year'));
  const month = Number(getPart(parts, 'month')) - 1;
  const day = Number(getPart(parts, 'day'));
  const hour = Number(getPart(parts, 'hour'));
  const minute = Number(getPart(parts, 'minute'));
  const second = Number(getPart(parts, 'second'));

  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export function isDST(date: Date = new Date()): boolean {
  const formatter = new Intl.DateTimeFormat('en-US', formatterOptions);
  const parts = formatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes): number =>
    Number(parts.find((p) => p.type === type)!.value);

  const tzDate = new Date(
    Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'))
  );
  const offsetMinutes = Math.round((tzDate.getTime() - date.getTime()) / 60000);

  // Standard time offset is +120 minutes (+02:00)
  // DST offset is +180 minutes (+03:00)
  return offsetMinutes === 180;
}

export default {
  name: timezoneName,
  get offset(): string {
    return isDST() ? '+03:00' : '+02:00';
  },
  now,
  isDST,
};
