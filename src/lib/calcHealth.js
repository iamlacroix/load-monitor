import { HEALTH_OK, HEALTH_WARNING } from '../constants/healthStatus';

// 2m * 60s * 1000ms
const twoMinutes = 2 * 60 * 1000;
const healthThreshold = 1;

export default function calcSystemHealth(allRecords) {
  const records = allRecords
    // Get records from the last 2 minutes.
    .filter(record => record.get('recordedAt') >= Date.now() - twoMinutes);

  const avg = records
    .map(record => record.get('avg1Min'))
    .reduce((sum, value) => sum + value, 0) / records.size;

  // Ensure there's a least a small sampling of data before triggering a warning.
  if (records.size < 2) {
    return [HEALTH_OK, avg];
  }

  const status = avg >= healthThreshold ? HEALTH_WARNING : HEALTH_OK;

  return [status, avg];
}
