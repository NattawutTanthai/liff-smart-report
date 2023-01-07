import clientPromise from '../../lib/mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("smart-report-db");
        const data = await db.collection("order").insertOne(req.body);
        res.json(req.body);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
}