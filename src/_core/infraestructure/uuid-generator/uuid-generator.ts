import { IUUIDGenerator } from "src/_core/application/uuid-generator/uuid-generator.interface";
import { v4 } from "uuid";

export class UUIDGenerator implements IUUIDGenerator {
    
    generate(): string {
        return v4()
    }

}