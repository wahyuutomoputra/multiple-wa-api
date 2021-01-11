import { app } from "../lib/system/server";
import whatsapp from "./whatsapp.route";

app.use("/api", whatsapp);

export default app;