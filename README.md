
# 🚀 Starting a NestJS Application from Scratch

This guide walks you through creating a basic NestJS application **without using the CLI**, explaining each concept and configuration clearly.

---

## 📦 Step 1: Initialize the Project

```bash
npm init -y
```

This creates a basic `package.json` file for your project.

---

## 📥 Step 2: Install Core Dependencies

Install the essential NestJS and TypeScript packages:

```bash
npm i @nestjs/common \
       @nestjs/core \
       @nestjs/platform-express \
       reflect-metadata \
       typescript
```

### 📘 Explanation of Packages

| Package                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| `@nestjs/common`          | Provides commonly used classes and decorators (e.g., `@Controller`, `@Get`)|
| `@nestjs/core`            | Core NestJS runtime, handles module system and app lifecycle               |
| `@nestjs/platform-express`| Connects NestJS to the Express.js HTTP server engine                       |
| `reflect-metadata`        | Enables metadata reflection for decorators (required by Nest)              |
| `typescript`               | TypeScript compiler                                                        |

---

## ⚙️ Step 3: Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### ✅ Explanation

- `experimentalDecorators`: Enables use of decorators like `@Controller`, `@Get`.
- `emitDecoratorMetadata`: Required for dependency injection and metadata reflection.
- `target`: Sets ECMAScript version for output.
- `module`: Use `commonjs` for Node.js compatibility.

---

## 🧱 Core Building Blocks in NestJS

| Component   | Description                                                 |
|-------------|-------------------------------------------------------------|
| **Pipe**    | Used for validating or transforming request input           |
| **Guard**   | Protects routes (authentication/authorization logic)        |
| **Controller** | Defines HTTP routes and handlers                         |
| **Repository** | Used to access and manage data from the database         |
| **Module**  | Groups related code together (controllers, providers, etc.) |

> 🔸 Every NestJS application must have **at least one Module and one Controller**.

---

## 🛠️ Step 4: Setup Basic Controller and Module

Create a file `src/main.ts` and paste the following code:

```ts
import { Controller, Module, Get } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return 'hi there!';
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 📌 Explanation

- `@Controller()` defines a class that handles routes.
- `@Get()` maps GET requests to a method.
- `AppModule` is the root module containing the controller.
- `NestFactory.create(AppModule)` bootstraps the application.

---

## ▶️ Step 5: Start the Server

Install `ts-node-dev` (if not already):

```bash
npm i -D ts-node-dev
```
-D === --save-dev

Then start the server with:

```bash
npx ts-node-dev src/main.ts
```

---

✅ Now you have a fully working minimal NestJS application running on `http://localhost:3000`.



# 🧹 Organizing NestJS Code into Separate Files

To keep your NestJS application clean and maintainable, it is a best practice to split your code into multiple files based on responsibility. Below is how to separate your controller, module, and entry point (`main.ts`) for better project structure.

---

## 📁 File Structure Overview

```
src/
├── app.controller.ts
├── app.module.ts
└── main.ts
```

---

## 📄 `app.controller.ts`

Defines your HTTP routes.

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }

  @Get('/bye')
  getByeThere() {
    return 'bye there!';
  }
}
```

### 📌 Explanation

- `@Controller('/app')`: Prefixes all routes with `/app`.
- `@Get('/asdf')`: Maps GET request to `/app/asdf`.
- `@Get('/bye')`: Maps GET request to `/app/bye`.

---

## 📄 `app.module.ts`

Registers your controller.

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
})
export class AppModule {}
```

### 📌 Explanation

- The module imports the `AppController` and declares it in the `controllers` array.
- This tells NestJS to include the controller in the application.

---

## 📄 `main.ts`

Bootstraps the NestJS application.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

### 📌 Explanation

- `NestFactory.create(AppModule)` creates the app with our root module.
- `app.listen(3000)` starts the HTTP server on port 3000.

---

✅ Your server is now modular and scalable. Access the routes at:
- `http://localhost:3000/app/asdf`
- `http://localhost:3000/app/bye`
