import axios from 'axios';
import { Respositories } from '@/models/Respositories';

export async function getRespositorioes(): Promise<Respositories[]> {

    const response = await axios.get('https://api.github.com/users/LeonardoMachado30/repos');
    return response.data;
}