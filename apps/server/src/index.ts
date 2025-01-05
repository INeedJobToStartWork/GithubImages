import app from "@app";

import { PORT, HOST } from "@env";
import * as routes from "@/api/v1/routes";
import { errorHandler } from "@/middlewares";

for (const route of Object.values(routes)) app.use(route);

app.use(errorHandler);

console.time("⚡ Server startup");
app.listen(PORT, () => {
	console.log(`Started on http://${HOST}:${PORT}`);
});
console.timeEnd("⚡ Server startup");
