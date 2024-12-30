import app from "@app";
import "@/api/routes/";

import { PORT, HOST } from "@/utils";

console.time("⚡ Server startup");
app.listen(PORT, () => {
	console.log(`Started on http://${HOST}:${PORT}`);
});
console.timeEnd("⚡ Server startup");
