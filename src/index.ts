import { app } from "./app";
import { PORT } from "./utils/secret";

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
