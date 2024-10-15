import { Module } from "@nestjs/common";
import MongooseModule from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { TokensModule } from "./tokens/tokens.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/budgetbuddynest'),
        AuthModule,
        UsersModule,
        TokensModule
    ],
})
export class AppModule { }