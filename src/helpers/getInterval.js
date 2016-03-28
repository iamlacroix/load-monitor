// Divide the millisecond timestamp by 10 seconds, get the floor value, then convert back to ms.
export const get10SecondInterval = timestamp => Math.floor(timestamp / 10000) * 10000;
