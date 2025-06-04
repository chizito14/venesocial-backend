import { Controller, Inject, Logger } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { UUIDGenerator } from "src/_core/infraestructure/uuid-generator/uuid-generator";
import { IRepoComment } from "src/post/application/repository/repository-comment.-interface";

@Controller('comment')
export class CommentController {
 
    private readonly userRepo: IRepoComment
    private readonly uuid: IUUIDGenerator
    private readonly logger = new Logger('CommentController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.uuid = new UUIDGenerator()
    }
    
}