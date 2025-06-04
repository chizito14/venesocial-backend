import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Mongoose } from "mongoose";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { OdmRepositoryUser } from "src/user/infraestructure/repository/odm-repo-user";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    private userRepo: IRepoUser

    constructor(
        private jwtService: JwtService,
        @Inject('NoSQL') mongo: Mongoose 
    ) {
        this.userRepo = new OdmRepositoryUser(mongo)
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()       
        if ( !request.headers['authorization'] ) throw new UnauthorizedException() 
        const [type, token] = request.headers['authorization'].split(' ') ?? []
        if ( type != 'Bearer' || !token ) throw new UnauthorizedException()                       
        try {
            const payload = await this.jwtService.verifyAsync( token, { secret: ' mariasal ' } )
            const userData = await (await this.userRepo.findById(payload.id)).Value
            if (!userData) throw new UnauthorizedException()
            request['user'] = {
                idUser: userData.idUser,
                username: userData.username,
                email: userData.email,
                fullName: userData.fullName,
                bio: userData.bio,
                profilePictureUrl: userData.profilePictureUrl
            }
        } catch { throw new UnauthorizedException() }
        return true
    }
    
}