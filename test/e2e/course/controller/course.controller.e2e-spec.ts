import * as request from 'supertest';
import { ExecutionContext, HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { FilterBussinesException } from 'src/infrastructure/exceptions/FilterBussinesException';
import { createStubObj } from 'test/utils/stubs/creaye-object.stub';
import { CourseRepository } from 'src/domain/course/course.repository';
import { CourseController } from 'src/infrastructure/course/controller/course.controller';
import { CourseListHandler } from 'src/application/course/query/course.list.handler';
import { JwtAuthGuard } from 'src/infrastructure/security/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/infrastructure/security/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

const sinonSandbox = createSandbox();

describe('Testing user controller', () => {

    let app: INestApplication;
    let _courseRepository: SinonStubbedInstance<CourseRepository>;

    beforeAll(async () => {
        _courseRepository = createStubObj<CourseRepository>(['findAll'], sinonSandbox);
        const moduleRef = await Test.createTestingModule({
            controllers: [CourseController],
            providers: [
                { provide: CourseRepository, useValue: _courseRepository },
                CourseListHandler,
                {
                    provide: JwtStrategy,
                    useValue: {
                        validate: () => ({ userId: "abc123", email: 'test@test.com' })
                    }
                },
            ]
        }).overrideGuard(JwtAuthGuard)
            .useValue({
                canActivate: (context: ExecutionContext) => {
                    const req = context.switchToHttp().getRequest();
                    req.user = { userId: "abc123", email: 'test@test.com' }
                    return true
                },
            }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalFilters(new FilterBussinesException());
        await app.init();
    });

    afterEach(() => {
        sinonSandbox.restore();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return list courses', () => {
        const courses: any[] = [{ name: 'Basic PHP', duration: 8, price: 35000 }];
        _courseRepository.findAll.returns(Promise.resolve(courses));

        return request(app.getHttpServer())
            .get('/courses')
            .expect(HttpStatus.OK)
            .expect({ data: courses });
    });
});