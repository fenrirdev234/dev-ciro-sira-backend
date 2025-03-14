import { connect } from "mongoose";

import {
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  MONGO_NAMEAPP,
  MONGO_PASSWORD,
  MONGO_USER,
  NODE_ENV,
} from "../utils/secret";
import { logger } from "../utils/logger";

const MONGO_URI =
  NODE_ENV === "production"
    ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/?retryWrites=true&w=majority&appName=${MONGO_NAMEAPP}`
    : "mongodb://localhost:27018/test-environment?directConnection=true";

const dbInit = () => {
  connect(MONGO_URI, {
    dbName: MONGO_DATABASE,
  })
    .then(() => {
      logger.info("DB ready");
    })
    .catch((error) => {
      logger.error("Error connecting to MongoDB:", error.message);

      // Exit process with failure
      process.exit(1);
    });
};

export default dbInit;
