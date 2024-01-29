import { Router } from 'express';
import { sensorRoutes } from './Sensor.routes';
import { telemetryRoutes } from './Telemetry.routes';
import { usersRoutes } from './User.routes';
import { userRulesRoutes } from './UserRules.routes';

const router = Router();

router.use(usersRoutes);
router.use(userRulesRoutes);
router.use(telemetryRoutes);
router.use(sensorRoutes);

export { router };
