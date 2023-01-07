import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("smart-report-db");
        const type = await db.collection("type").find({}).toArray();
        res.json(type);
    } catch (e) {
        console.error("error",e);
        throw new Error(e).message;
    }
//   res.status(200).json({ name: 'John Doe' })
}
