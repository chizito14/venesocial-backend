import { Controller, Get, Inject, Logger, Param, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { Mongoose } from "mongoose";
import { IRepoUser } from "src/user/application/repository/repository-user.interface";
import { GetManyUsers } from "../types/get-many-users";
import { JwtAuthGuard } from "src/auth/infraestructure/guards/jwt-auth.guard";
import { OdmRepositoryUser } from "../repository/odm-repo-user";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('user')
export class UserController {
 
    private readonly userRepo: IRepoUser
    private readonly logger = new Logger('UserController')

    constructor(
        @Inject('NoSQL') mongo: Mongoose,
    ) {
        this.userRepo = new OdmRepositoryUser(mongo)
    }

    @Get('find/username')
    @UseGuards(JwtAuthGuard)
    async findManyByUserName( @Query() entry: GetManyUsers ) {
        let page:number = 0
        let perPage:number = 10
        let username:string = ''
        if (entry.page) page = parseInt(entry.page)
        if (entry.perPage) perPage = parseInt(entry.perPage)
        if (entry.username) username = entry.username
        return await this.userRepo.findMany({
            username: username
        }, { page: page, perPage: perPage })
    }
    
    @Get('find/id/:id')
    @UseGuards(JwtAuthGuard)
    async findById( @Param('id') id: string ) {
        return (await this.userRepo.findById(id)).Value
    }

@Put('upload/:userId') // Usamos PUT para actualizar un recurso existente
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(
    @Param('userId') userId: string, // 
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    if (!file) {
      return { message: 'No se ha subido ningún archivo.' };
    }

    const photoPath = `/uploads/${file.filename}`;

    const updatedUser = await this.userRepo.updatePhoto(userId, photoPath);

    return {
      message: 'Foto subida y usuario actualizado exitosamente!',
      filename: file.filename,
      originalName: file.originalname,
      photoPath: photoPath,
      user: updatedUser,
    };
  }    
}