import { app } from "./app";
import { logger } from "./utils/logger";
import { PORT } from "./utils/secret";

app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
