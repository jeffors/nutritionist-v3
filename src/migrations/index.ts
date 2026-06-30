import * as migration_20260630_185931 from './20260630_185931';

export const migrations = [
  {
    up: migration_20260630_185931.up,
    down: migration_20260630_185931.down,
    name: '20260630_185931'
  },
];
