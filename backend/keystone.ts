import { config } from "@keystone-6/core"
import { session, withAuth } from "./auth"
import { lists } from "./schema"
import type { KeystoneContext } from '@keystone-6/core/types';

import Hashids from 'hashids'
import { getPostMarkMessages, handleGetSingleMessage, runFullArchive } from "./routes/rest";
const hashids = new Hashids(process.env.REACT_APP_SALT, +process.env.REACT_APP_SALT_LENGTH)
const bodyParser = require("body-parser");
var postmark = require("postmark");
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

require("dotenv-safe").config()
let portalUrl = process.env.PORTAL_URL

export default withAuth(
  config({
    server: {
      cors: {
        credentials: true,
        origin: "http://localhost:4000",
      },
      extendExpressApp: (app, createContext) => {
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())
        app.get("/reset-password/:email/:token", (req, res) => {
          res.send(req.params.token)
        })
        app.use('/rest', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next()          
        })
        app.post('/rest/archive', runFullArchive)

        // This route requires an email and id
        app.post("/rest/portal-link", async (req, res) => {

          const response = await client.sendEmailWithTemplate({
            "From": process.env.MAIL_FROM_ADDRESS,
            "To": process.env.NODE_ENV == "development" ? "mikeconrad@onmail.com" : req.body.email,
            "TemplateAlias": "portal-link",
            "TemplateModel": {
              "action_url": `${portalUrl}/parents/${hashids.encode(req.body.id)}`
            }
          });
          res.json({status: 'success'})
        }) 
        // This route should take an in a token and an email address.
        // The email address is used to send a notification when the archive process
        // has been completed.
        app.post("/rest/archive", async (req, res) => {
          

        })
        app.delete("/rest/course/all", async (req, res) => {
          const context = (req as any).context as KeystoneContext;
          const courseList = await context.query.Course.findMany()
          for (const course of courseList) {
            const { id } = course
            await context.query.Course.deleteOne({where: { id }})
          }
          res.json({ status: "success" })
        })
        app.get("/rest/postmark/messages", getPostMarkMessages);
        app.get("/rest/postmark/messages/:id", handleGetSingleMessage);
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
      isDisabled: false,
      isAccessAllowed: (context) => !!context.session?.data,
    },
    lists,
    session,
  })
)
