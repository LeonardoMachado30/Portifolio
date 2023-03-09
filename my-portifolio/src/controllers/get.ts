import axios from 'axios';
import { Respositories } from '@/models/Respositories';
import { User } from '@/models/user';

export async function get(path: string): Promise<JSON> {

    const resp = await axios.get(`https://api.github.com/users/LeonardoMachado30/${path}`);
    return resp.data.json();
}