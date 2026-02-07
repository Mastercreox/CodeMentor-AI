// User Profile Service Entry Point
// This service will be implemented in task 3

import express from 'express';
import { logger, createServiceLogger } from '@codementor/shared';

const app = express();
const serviceLogger = createServiceLogger('user-profile-service');
const PORT = process.env.PORT || 3003;

// Placeholder implementation
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'user-profile-service' });
});

app.listen(PORT, () => {
  serviceLogger.info(`User Profile Service running on port ${PORT}`);
});

export default app;