import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/create-user-credential.dto';
import { User } from './entity/user.entity';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        private readonly jwtService: JwtService,
    ) { }

    async signUp(authCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.usersRepository.create({ username, password: hashedPassword });

        try {
            await this.usersRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
    async signIn(authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;
        const user = await this.usersRepository.findOne({ where: { username } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
