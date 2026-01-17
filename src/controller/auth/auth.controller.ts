import { Request, Response } from 'express';
import { AuthService } from '../../service/auth/auth.service';

const authService = new AuthService();

export async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);
        res.status(201).json({ id: user.id, username: user.username });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json(token);
    } catch (err: any) {
        res.status(401).json({ error: err.message });
    }
}
