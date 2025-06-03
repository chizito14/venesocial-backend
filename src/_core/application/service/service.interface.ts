import { Result } from "src/_core/utils/result-handler/result.handler";

export interface IService<D, R> {
    execute ( data: D ): Promise<Result<R>>
}