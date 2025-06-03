
export interface IEncryptor {
    hash(planeText: string): Promise<string>
    compareHash(planeText: string, cipherText: string): Promise<boolean>
}