import { useEffect, useState } from "react";
type BasicEmail = {
    MessageID: string;
    Recipients: string[];
    ReceivedAt: string;
    From: string;
    Subject: string;
    Status: "Sent" | "Processed" | "Queued";
    HtmlBody?: string;
}

type EmailData = {
    TotalCount: number;
    Messages: BasicEmail[];
}
interface MessageDetails extends BasicEmail {
    MessageEvents: {
        Recipient: string;
        Type: "SubscriptionChanged" | "Delivered" | "Transient" | "Opened" | "LinkClicked" | "Bounced"
        ReceivedAt: string;
    }[]
}
export default function useGetMessages(): [EmailData, (id: string) => void, MessageDetails, (page: number, count: number, recipient?: string, subject?: string) => void]{
    const [messageData, setMessageData] = useState<EmailData>();
    const [singleMessage, setSingleMessage] = useState<MessageDetails>();

    const getMessageById = (id: string) => {
        fetch(`/rest/postmark/messages/${id}`)
        .then((response) => response.json() as Promise<MessageDetails>)
        .then((data) => {
          setSingleMessage(data)
        })
        .catch((e) => console.log("error", e))
    }

    const getAllMessages = (page: number, count: number, recipient?: string, subject?: string) => {
        let offset: number;
        if (page > 1) {
            offset = (page - 1) * count
        } else {
            offset = 0
        }
        fetch(`/rest/postmark/messages?count=${count}&offset=${offset}&recipient=${recipient || ""}&subject=${subject || ""}`)
        .then((response) => response.json() as Promise<EmailData>)
        .then((data) => {
          setMessageData(data)
        })
        .catch((e) => console.log("error", e))
    }

    useEffect(() => {
        getAllMessages(0, 10);
    }, []);
    return [messageData, getMessageById, singleMessage, getAllMessages]
}