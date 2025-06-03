import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Mongoose } from "mongoose";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private userRepository: OdmUserRepository

    constructor(
        private jwtService: JwtService,
        @Inject('NoSQL') mongo: Mongoose 
    ) {
        this.userRepository = new OdmUserRepository(mongo)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()       
        if ( !request.headers['authorization'] ) throw new UnauthorizedException() 
        const [type, token] = request.headers['authorization'].split(' ') ?? []
        if ( type != 'Bearer' || !token ) throw new UnauthorizedException()                       
        try {
            const payload = await this.jwtService.verifyAsync( token, { secret: process.env.JWT_SECRET_KEY } )
            const userData = await this.userRepository.findById(payload.id)
            if (!userData) throw new UnauthorizedException()
            request['user'] = userData
        } catch { throw new UnauthorizedException() }
        return true
    }
    
}