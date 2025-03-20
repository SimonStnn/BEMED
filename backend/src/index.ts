import express from "express";
import rootRouter from "./routes";
import cors from "cors";
import session from "express-session";
import Keycloak from "keycloak-connect";
import { type EnvVariable, url } from "./utils";

const PORT = process.env.BEMED_API_PORT || 3000;
const { KEYCLOAK_BACKEND_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_CLIENT_SECRET } = process.env as Record<
  EnvVariable,
  string
>;

console.debug(`Auth server URL: ${url.keycloak}`);

const app = express();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
}));

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak(
  { store: memoryStore },
  {
    realm: KEYCLOAK_REALM,
    resource: KEYCLOAK_BACKEND_CLIENT_ID,
    "auth-server-url": url.keycloak,
    "ssl-required": "external",
    "confidential-port": 0,
    "bearer-only": true,
  }
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: KEYCLOAK_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);

// Use the root router for all routes
app.use("/", rootRouter);

app.get("/protected", keycloak.protect(), (req, res) => {
  res.send("Protected resource");
});

// Start the server
app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
