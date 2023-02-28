import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/controllers/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await getUser();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}