import { AxiosError } from "axios";

export default class ErrorSerivce {

    static getError(error: any) {
        if (error instanceof AxiosError && error.status === 400 && error.response) {
            return error.response.data;
        } else {
            return { message: "Internal Server Error." };
        }
    }
}