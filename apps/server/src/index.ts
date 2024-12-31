import app from "@app";
import "@/api/v1/routes";

import { PORT, HOST } from "@env";

console.time("⚡ Server startup");
app.listen(PORT, () => {
	console.log(`Started on http://${HOST}:${PORT}`);
});
console.timeEnd("⚡ Server startup");
