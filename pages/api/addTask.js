import  { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("task");
        const posts = await db.collection("task").insertOne(req.body);
        res.status(200).json(posts);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}

