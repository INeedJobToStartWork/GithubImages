import app from "@/app";

app.get("/v1/image", (req, res) => {
	res.send("Hello World");
});
