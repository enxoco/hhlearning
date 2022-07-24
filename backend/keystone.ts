import { config } from "@keystone-6/core"
import { KeystoneContext } from "@keystone-6/core/types"
import { session, withAuth } from "./auth"
import { lists } from "./schema"
import Hashids from 'hashids'
const hashids = new Hashids(process.env.REACT_APP_SALT, +process.env.REACT_APP_SALT_LENGTH)
const bodyParser = require("body-parser");
var postmark = require("postmark");
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

require("dotenv-safe").config()

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
        app.use('/archive', async (req, res, next) => {
          (req as any).context = await createContext(req, res);
          next()          
        })
        // app.post("/portal-link", async (req, res) => {
        //   const context = (req as any).context as KeystoneContext

        //   const { id, email } = req.body()

        //   const emailSend = await () => {
        //     await client.sendEmail({
        //       "From": process.env.MAIL_FROM_ADDRESS,
        //       "To": req.body?.email,
        //       "Subject": "Hilger Parent portal report cards",
        //       "HtmlBody": `Reports cards for ${students.length} students have successfully been archived.`,
        //       "MessagStream": "outbound"
        //     })
        //   }
        // })
        // This route should take an in a token and an email address.
        // The email address is used to send a notification when the archive process
        // has been completed.
        app.post("/archive", async (req, res) => {
          
          if (req.body?.token == process.env.ADMIN_TOKEN) {
            console.log('matching token')
            const context = (req as any).context as KeystoneContext

            const students = await context.query.Student.findMany({
              query: `id`
            })
            res.writeHead(200, {
              'Content-Type': 'application/json',
              'Transfer-Encoding': 'chunked'
            })
          
            res.write('[')
            res.write(JSON.stringify({status: 'started'}))
            console.log('students', students)
            for (const student of students){
              const id = hashids.encode(student.id)
              console.log('running archive')
              await fetch('https://portal.hhlearning.com/print.php?student=' + id)
            }
            await client.sendEmail({
              "From": process.env.MAIL_FROM_ADDRESS,
              "To": req.body?.email,
              "Subject": "Hilger Parent portal report cards saved",
              "HtmlBody": `Reports cards for ${students.length} students have successfully been archived.`,
              "MessagStream": "outbound"
            })
            res.write(JSON.stringify({status: 'email sent'}) + ']')
            res.end()
          }
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
