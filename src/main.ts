import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";


@Controller()
class AppController{

    @Get("/helloworld")
    HelloWorld(){
        console.log("HelloWorld")
    }
}


@Module({
    controllers: [AppController]
})
class AppModule{

}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(3000)
}


bootstrap()