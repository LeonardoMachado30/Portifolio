import { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@/controllers/get';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const repos = await get("repos");
        res.status(200).json(repos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}