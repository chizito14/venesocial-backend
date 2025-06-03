import * as bcrypt from 'bcrypt'
import { IEncryptor } from 'src/_core/application/encryptor/encryptor.interface'

export class BcryptEncryptor implements IEncryptor {
    constructor() {}
    async hash(planeText: string): Promise<string> {
        return await bcrypt.hash(planeText, 10)
    }
    async compareHash(planeText: string, cipherText: string):Promise<boolean> {
        return await bcrypt.compare(planeText, cipherText)
    }
}