import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) { }

    transform(value: unknown) {
        try {
            console.log(value)
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'Validation Failed',
                    errors: error.errors,
                })
            }

            throw new BadRequestException({ errors: error });
        }
    }
}