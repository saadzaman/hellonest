///// ormconfig.ts /////
import { NODE_ENV, DATABASE_URL } from './config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// db configuration for the orm
const ormconfig: PostgresConnectionOptions = {
  type: 'postgres', // name of db you'll be using
  url: DATABASE_URL,
  uuidExtension: 'uuid-ossp', // for using `uuid` as the type for Primary-Column `id` column
  logging: true,
  synchronize: NODE_ENV !== 'production',
};

// I'm using the `url: DATABASE_URL` because I'm using a
// hosted PostgreSQL database. If you're using a local postgresql
// instance please follow the article's one

export default ormconfig;
