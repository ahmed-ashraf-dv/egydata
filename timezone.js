'use strict';

const name = 'Africa/Cairo';

function now() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;

  const year = Number(get('year'));
  const month = Number(get('month')) - 1;
  const day = Number(get('day'));
  const hour = Number(get('hour'));
  const minute = Number(get('minute'));
  const second = Number(get('second'));

  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

function isDST(date = new Date()) {
  // Egypt resumed daylight saving time in 2023.
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Africa/Cairo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);

  const tzDate = new Date(Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second')));
  const offsetMinutes = Math.round((tzDate.getTime() - date.getTime()) / 60000);

  // Standard time offset is +120 minutes (+02:00)
  // DST offset is +180 minutes (+03:00)
  return offsetMinutes === 180;
}

module.exports = {
  name,
  get offset() {
    return isDST() ? '+03:00' : '+02:00';
  },
  now,
  isDST
};
