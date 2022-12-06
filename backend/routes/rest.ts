import type { Request, Response } from 'express';
import type { KeystoneContext } from '@keystone-6/core/types';
import { list } from '@keystone-6/core';
import Hashids from 'hashids'
const hashids = new Hashids(process.env.REACT_APP_SALT, +process.env.REACT_APP_SALT_LENGTH)
const bodyParser = require("body-parser");
var postmark = require("postmark");
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
var request = require('request');

require("dotenv-safe").config()
let portalUrl = process.env.PORTAL_URL
export async function runFullArchive(req: Request, res: Response) {
  const context = (req as any).context as KeystoneContext;
  console.log('context', context.session.itemId)
  const user = await context.query.User.findOne({ where: { id: context.session.itemId }, query: `isAdmin`})
  console.log("user", user)
    if (user && user.isAdmin) {

        const students = await context.query.Student.findMany({
            query: `id, firstName`
        })

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked'
          })
        
          res.write('[')
          res.write(JSON.stringify({status: 'started'}))
          for (const student of students){
            const id = hashids.encode(student.id)
            console.log('running archive')
            await request(`${portalUrl}/print.php?student=${id}`, function (error) {
              if (error) throw new Error(error);
              console.log('Running report');
            });
            
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
    } else {
      res.json({status: 'error', msg: 'Token MisMatch'})
    }
}