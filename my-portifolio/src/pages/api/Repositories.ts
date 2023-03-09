import { NextApiRequest, NextApiResponse } from 'next';
import { getRespositorioes } from '@/controllers/respositories';
import { Respositories } from '@/models/Respositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const repos = await getRespositorioes();
        res.status(200).json(repos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}