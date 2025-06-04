import { BadRequestException } from "@nestjs/common";

export class Result<T> {
    static forEach(arg0: (e: any) => number) {
        throw new Error("Method not implemented.");
    }
    private value?: T
    private error?: Error

    private constructor(value?: T, error?: Error) {
        this.value = value
        this.error = error
    }

    isSuccess(): boolean {
        return this.value !== undefined && this.value !== null
    }

    get Value(): T {
        if (this.isSuccess()) return this.value!
        throw new BadRequestException('The value does not exist')
    }

    get Error(): Error {
        if (this.error) return this.error
        throw new BadRequestException('The error does not exist')
    }

    static success<T>(value: T): Result<T> {
        return new Result<T>(value)
    }

    static fail<T>(error: Error): Result<T> {
        return new Result<T>(undefined, error)
    }
}
