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
type EmailData = {
  MessageID: string;
  Recipients: string[];
  ReceivedAt: string;
  From: string;
  Subject: string;
  Status: "Sent" | "Processed" | "Queued";
  messageEvents: {
    Recipient: string;
    Type: "SubscriptionChanged" | "Delivered" | "Transient" | "Opened" | "LinkClicked" | "Bounced"
    ReceivedAt: string;
  }
}
export async function handleGetSingleMessage(req: Request, res: Response){
      client.getOutboundMessageDetails(req.params.id).then(result => {
        res.json(result)
      })
}
export async function getPostMarkMessages(req: Request, res: Response) {
  const emails: EmailData[] = []
  const { TotalCount, Messages } = await client.getOutboundMessages({ count: req.query.count || 20, offset: req.query.offset || 0, recipient: req.query.recipient || "", subject: req.query.subject || "" })
  Messages.map((message) => { 
    message.ReceivedAt = new Date(message.ReceivedAt).toLocaleString("en-US", { timeZone: "EST"})
  })
  res.json({ TotalCount, Messages })
  // await Messages.map(async (message: { MessageID: string }) => {
  //   const messageDetails = await client.getOutboundMessageDetails(message.MessageID)
  //   console.log("messageDetails", messageDetails)
  //   await emails.push(messageDetails)
  // })
  // res.json(await emails)
  //   client.getOutboundMessages({count:10, offset:0}).then(result => {
//     console.log(result.TotalCount);
//     console.log(result.Messages);
//     console.log(result.Messages[0].To);
//     console.log(result.Messages[0].Metadata.test);
//     console.log(result.Messages[0].MessageID);
//     result.Messages.map((message) => {
//       client.getOutboundMessageDetails(message.MessageID).then(result => {
//         emails.push(result)
//         console.log(result.Body);
//         console.log(result.Metadata.test);
//         console.log(result.MessageEvents.length);
//       })
      
//     })
// }).then(() => res.json(emails))
  // fetch("https://api.postmarkapp.com/messages/outbound?count=500&offset=0", { headers: { 
  //   "X-Postmark-Server-Token": "b642bb21-30d9-446f-bc0a-c0c44651bfb6", 
  //   "Content-Type": "application/json" 
  // } })
  // .then((response) => response.json() as Promise<EmailData[]>)
  // .then((data) => {
  //   console.log("data", data);
  //   res.json(data)
  // })
  // .catch((e) => console.log("error", e))
//   client.getOutboundMessageEvents({count:500, offset:0}).then(result => {
//     console.log(result.TotalCount);
//     console.log(result.Messages);
//     console.log(result.Messages[0].To);
//     console.log(result.Messages[0].Metadata.test);
//     console.log(result.Messages[0].MessageID);
//     console.log(result.Messages[0].me)
//     res.json(result)
// });
}
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