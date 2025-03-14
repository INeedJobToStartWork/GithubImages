import type { Application } from "express";
import express from "express";
import { rateLimit } from "express-rate-limit";

export const app: Application = express();

app.use(express.json());
app.use(
	rateLimit({
		windowMs: 2 * 60 * 1000, // 2 minutes
		limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
		standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
		legacyHeaders: false // Disable the `X-RateLimit-*` headers.
		// store: ... , // Redis, Memcached, etc. See below.
	})
);

export default app;
