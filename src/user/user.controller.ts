import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDTO } from "./dto/signUp.dto";
import { LoginDTO } from "./dto/login.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/signup")
  signUp(@Body() signupData: SignupDTO) {
    return this.userService.signUp(signupData);
  }

  @Post("/login")
  login(loginData: LoginDTO) {
    return this.userService.login(loginData);
  }
}
