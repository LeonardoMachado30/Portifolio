import { NextApiRequest, NextApiResponse } from 'next';
import { get } from '@/controllers/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await get("LeonardoMachado30");
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}