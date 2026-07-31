import * as migration_20260630_185931 from './20260630_185931';
import * as migration_20260703_073613 from './20260703_073613';
import * as migration_20260721_173543 from './20260721_173543';
import * as migration_20260728_163121 from './20260728_163121';
import * as migration_20260731_140105 from './20260731_140105';

export const migrations = [
  {
    up: migration_20260630_185931.up,
    down: migration_20260630_185931.down,
    name: '20260630_185931',
  },
  {
    up: migration_20260703_073613.up,
    down: migration_20260703_073613.down,
    name: '20260703_073613',
  },
  {
    up: migration_20260721_173543.up,
    down: migration_20260721_173543.down,
    name: '20260721_173543',
  },
  {
    up: migration_20260728_163121.up,
    down: migration_20260728_163121.down,
    name: '20260728_163121',
  },
  {
    up: migration_20260731_140105.up,
    down: migration_20260731_140105.down,
    name: '20260731_140105'
  },
];
