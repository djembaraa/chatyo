import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { error } from "console";
import errorHandle from "./middleware/errorHandle";
import groupRouter from "./routes/groupRoutes";
import transactionsRoutes from "./routes/transactionsRoutes";
import chatRouter from "./routes/chatRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/api", userRoutes);
app.use("/api", groupRouter);
app.use("/api", transactionsRoutes);
app.use("/api", chatRouter);

app.use(errorHandle);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
