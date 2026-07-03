import * as migration_20260630_185931 from './20260630_185931';
import * as migration_20260703_073613 from './20260703_073613';

export const migrations = [
  {
    up: migration_20260630_185931.up,
    down: migration_20260630_185931.down,
    name: '20260630_185931',
  },
  {
    up: migration_20260703_073613.up,
    down: migration_20260703_073613.down,
    name: '20260703_073613'
  },
];
