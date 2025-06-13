import { AuthResponseDto, LoginDto, LogoutResponesDto, SignupDto } from "../dto/index.dto";
import { $api } from "../http";

export default class AuthService {

    static async signup(data: SignupDto) {
        return await $api.post<AuthResponseDto>('/auth/signup', data);
    }
    static async login(data: LoginDto) {
        return await $api.post<AuthResponseDto>('/auth/login', data);
    }
    static async logout() {
        return await $api.delete<LogoutResponesDto>('/auth/logout');
    }
}