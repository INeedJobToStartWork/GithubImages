import app from "@/app";
import "@/api/routes/";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";


console.time("⚡ Server startup");
app.listen(PORT, () => {
	console.log(`Started on http://${HOST}:${PORT}`);
});
console.timeEnd("⚡ Server startup");
