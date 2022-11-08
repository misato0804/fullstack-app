import UserModel from "./user.model";
import token from "../../utils/token";

class UserService {
    private user = UserModel;

    public async register(
        name: string,
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({name, email, password})
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error("Unable to create user")
        }
    }

    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});
            if (!user) {
                throw new Error()
            }
            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error("Wrong credential")
            }
        } catch (error) {
            throw new Error("Unable to login user")
        }
    };
}

export default UserService;