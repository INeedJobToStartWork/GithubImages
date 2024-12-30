import "dotenv/config";
import { is } from "typia";

//----------------------
// Types
//----------------------

declare global {
	namespace NodeJS {
		export interface ProcessEnv {
			HOST: string;
			PORT: string;
		}
	}
}

//----------------------
// Functions
//----------------------

//----------------------
// Functions
//----------------------

const envVariables = process.env;
if (!is<NodeJS.ProcessEnv>(envVariables)) throw new Error("Invalid env variables");

export default envVariables;
export const {PORT,HOST,TZ,...restEnv} = envVariables;
