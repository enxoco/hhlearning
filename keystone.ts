import { config } from "@keystone-6/core"
import { session, withAuth } from "./auth"
import { lists } from "./schema"
require("dotenv-safe").config()

export default withAuth(
  config({
    server: {
      cors: {
        credentials: true,
        origin: "http://localhost:4000",
      },
      extendExpressApp: (app) => {
        app.get("/reset-password/:email/:token", (req, res) => {
          res.send(req.params.token)
        })
      },
    },
    db: {
      provider: "postgresql",
      url: process.env.DB_CONNECTION_STRING,
      enableLogging: false,
      useMigrations: true,
      idField: { kind: "autoincrement" },
    },

    ui: {
      isDisabled: process.env.NODE_ENV === "production",
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
)
