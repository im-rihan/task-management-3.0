import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		TasksModule,
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '78626458',
			database: 'task_management_3.0',
			autoLoadEntities: true,
			synchronize: true,
		}),
	],
})
export class AppModule { }