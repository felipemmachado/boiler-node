interface MongoConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

export default {
  host: process.env.MONGO_URL || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USER || 'felipe',
  password: process.env.MONGO_PASS || 'felipe',
  database: process.env.MONGO_DB || 'formularios-api',
} as MongoConfig;
