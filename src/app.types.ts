import type { ConfigService } from '@nestjs/config';
import type { InferType } from 'yup';
import type { CONFIG_SCHEMA } from './app.constants';

export type AppConfigService = ConfigService<
  InferType<typeof CONFIG_SCHEMA>,
  true
>;
