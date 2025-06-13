import axios from "axios";
import { IError, IUser } from "../definitions/interfaces";
import { AuthResponseDto, LoginDto, SignupDto } from "../dto/index.dto";
import AuthService from "../services/auth.service";
import { makeAutoObservable } from "mobx";
import ErrorSerivce from "../services/error.service";
import UsersService from "../services/users.service";

export class Auth {
    user = {} as IUser;
    isAuth: boolean = false;
    isLoading: boolean = false;
    error: IError | null = null;
    success: string | null = null;

    setUser(user: IUser) {
        this.user = user;
    }
    setIsAuth(value: boolean) {
        this.isAuth = value;
    }
    setIsLoading(value: boolean) {
        this.isLoading = value;
    }
    setError(error: IError | null) {
        this.error = error;
    }
    setSucess(value: string | null) {
        this.success = value;
    }

    constructor() {
        makeAutoObservable(this);
    }

    async signup(data: SignupDto) {
        try {
            this.setIsLoading(true);
            const response = ((await AuthService.signup({ ...data, avatar: null })).data);
            localStorage.setItem('token', response.tokens.accessToken);
            let userAvatar = { avatar: null };
            if (data.avatar) {
                const responseAvatar = await UsersService.uploadAvatar(response.user.id, data.avatar);
                if (!responseAvatar) throw Error();
            }
            this.setIsAuth(true);
            this.setUser({ ...response.user, avatar: userAvatar.avatar });
            this.setError(null)
            this.setSucess("You have successfully registered.")
        } catch (error) {
            this.setSucess(null);
            this.setError(ErrorSerivce.getError(error));
        } finally {
            this.setIsLoading(false);
        }
    }

    async login(data: LoginDto) {
        try {
            this.setIsLoading(true);
            const response = await AuthService.login(data);
            localStorage.setItem('token', response.data.tokens.accessToken);

            this.setIsAuth(true);
            this.setUser(response.data.user)
            this.setError(null)
            this.setSucess("You have successfully logged in.")
        } catch (error) {
            this.setSucess(null);
            this.setError(ErrorSerivce.getError(error));
        } finally {
            this.setIsLoading(false);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');

            this.setIsAuth(true);
            this.setUser({} as IUser);
            location.reload();
        } catch (error) {
            this.setError(ErrorSerivce.getError(error));
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true);
            const response = await axios.post<AuthResponseDto>(
                `${import.meta.env.VITE_API_URL}/auth/refresh`,
                {},
                { withCredentials: true });

            localStorage.setItem('token', response.data.tokens.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } finally {
            this.setIsLoading(false);
        }
    }
}