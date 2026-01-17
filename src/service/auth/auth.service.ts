
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/user/User';

const JWT_SECRET = 'minha_chave_secreta_teste';

export class AuthService {
    private userRepo = AppDataSource.getRepository(User);

    async register(username: string, password: string) {
        const existing = await this.userRepo.findOneBy({ username });
        if (existing) throw new Error("Usuário já existe");

        const hash = await bcrypt.hash(password, 10);
        const user = this.userRepo.create({ username, password: hash });
        await this.userRepo.save(user);
        return user;
    }

    async login(username: string, password: string) {
        const user = await this.userRepo.findOne({ where: { username } });
        if (!user) throw new Error('Usuário não encontrado');

        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) throw new Error('Senha inválida');

        const token = jwt.sign(
            { id: user.id, username: user.username, },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { access_token: token };
    }
}
