import { Server } from "./server.tsx";

const server = new Server();
await server.prepare('deploy');
server.deploy();