import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { SignupDTO } from "./dto/signUp.dto";
import { LoginDTO } from "./dto/login.dto";
import { Public } from "@/utils";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post("/signup")
  signUp(@Body() signupData: SignupDTO) {
    return this.userService.signUp(signupData);
  }

  @Public()
  @Post("/login")
  login(@Body() loginData: LoginDTO) {
    return this.userService.login(loginData);
  }
}
