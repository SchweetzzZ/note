import { Elysia } from "elysia";
import {auth} from "./modules/auth/auth"
import {noteRoutes} from "./modules/note/routes"
import {cors} from "@elysiajs/cors"

const app = new Elysia()
  .use(cors({
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
}))
.use(noteRoutes)
.mount(auth.handler)
.get("/", () => "Hello Elysia")
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
