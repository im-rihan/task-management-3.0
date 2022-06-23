import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		TasksModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '78626458',
			database: 'task-management',
			autoLoadEntities: true,
			synchronize: true,
		}),
		AuthModule,
	],
})
export class AppModule { }