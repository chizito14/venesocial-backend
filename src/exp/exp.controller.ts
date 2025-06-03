import { Controller, Get, Inject } from "@nestjs/common";
import { Mongoose } from "mongoose";


@Controller('exp')
export class ExpController {

    constructor(
        @Inject('NoSQL') private readonly mongo: Mongoose,
    ) {}

    @Get('embe')
    async getEmbe() {
        
    }

    @Get('ref')
    async getRef() {}

}