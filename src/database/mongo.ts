import { connect } from "mongoose";
import {
  MONGO_DATABASE,
  MONGO_HOSTNAME,
  MONGO_PASSWORD,
  MONGO_USER,
  MONGO_NAMEAPP,
  NODE_ENV,
} from "../utils/secret";

const MONGO_URI =
  NODE_ENV === "production"
    ? `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/?retryWrites=true&w=majority&appName=${MONGO_NAMEAPP}`
    : "mongodb://localhost:27018/test-environment?directConnection=true";

const dbInit = async () => {
  await connect(MONGO_URI, {
    dbName: MONGO_DATABASE,
  })
    .then(() => {
      console.log("DB ready");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error.message);

      // Exit process with failure
      process.exit(1);
    });
};

export default dbInit;
