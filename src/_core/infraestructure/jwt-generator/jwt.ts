import { JwtService } from "@nestjs/jwt";
import { IJWTGenerator } from "src/_core/application/jwt-generator/jwt-generator.interface";

export class JWTGenerator implements IJWTGenerator {
    private readonly jwtService: JwtService
    constructor(jwt: JwtService) { 
        this.jwtService = jwt
    }

    generate(param: string): string {
        return this.jwtService.sign( { id: param } )
    }
    
}