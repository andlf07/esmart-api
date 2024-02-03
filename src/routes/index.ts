import { Router } from 'express';
import { alertRoutes } from './Alert.routes';
import { authRoutes } from './Auth.routes';
import { sensorRoutes } from './Sensor.routes';
import { telemetryRoutes } from './Telemetry.routes';
import { usersRoutes } from './User.routes';
import { userRulesRoutes } from './UserRules.routes';

const router = Router();

router.use(usersRoutes);
router.use(userRulesRoutes);
router.use(telemetryRoutes);
router.use(sensorRoutes);
router.use(alertRoutes);
router.use(authRoutes);

export { router };
