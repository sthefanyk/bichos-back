import { UserTypeormRepository } from "../../../infra/repositories/type-orm/user-typeorm.repository";
import { AuthService } from "./auth.service";
import { DataSource } from "typeorm";
import UserModel from "../../../domain/models/person.model";
import User from "../../../domain/entities/users/user";
import UserProps from "../../../domain/entities/users/user-props";

describe("AuthService Test", () => {
    test("createToken", async () => {
        const dataSource = new DataSource({
            type: 'sqlite',
            database: 'src/database/db.sqlite',
            synchronize: true,
            logging: true,
            entities: [UserModel],
            migrations: ['src/database/migration/*.ts']
        });
      
        await dataSource.initialize();

        const repo = dataSource.getRepository(UserModel);

        const userRepo = new UserTypeormRepository(repo);

        
        // const userProps = new UserProps("user test", "user@test.com", "UserTest123");
        // const user = new User(userProps);
        
        // console.log(user);
        // await userRepo.insert(user);
        
        // console.log(await userRepo.findAll());

        
        const service = new AuthService(userRepo);
        
        const user = await userRepo.findByEmail('user@test.com');

        const token = service.createToken(user, "7d");

        await service.singIn("user@test.com", "UserTest123")

        

        // console.log();
    });

    test("token", async () => {
        const dataSource = new DataSource({
            type: 'sqlite',
            database: 'src/database/db.sqlite',
            synchronize: true,
            logging: true,
            entities: [UserModel],
            migrations: ['src/database/migration/*.ts']
        });
      
        await dataSource.initialize();

        const repo = dataSource.getRepository(UserModel);

        const userRepo = new UserTypeormRepository(repo);

        const service = new AuthService(userRepo);


        const data = service.checkTokenUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicmVnaXN0ZXIiLCJlbWFpbCI6InJlZ2lzdGVyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk0OTAyNjQ1LCJleHAiOjE2OTU1MDc0NDUsImF1ZCI6InVzZXJzIiwiaXNzIjoiQVBJIEJpY2hvcyIsInN1YiI6ImJlMjNmMjI1LTRkZTMtNGRkMS04NTIxLTNlMWYzNWJhOTBjNCJ9.yki_I0zHf2IHGNynPMIIjKNCC6PVJJBPEe1ZN9TZwwE");
    
        console.log(data);
    })
});