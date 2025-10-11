import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Project } from 'src/project/project.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
	@Prop({ required: true, unique: true })
	title: string;
	@Prop()
	done: boolean;
  @Prop({ type: Types.ObjectId, ref: Project.name })
  projectId: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

