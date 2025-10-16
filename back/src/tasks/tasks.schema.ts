import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Projects } from 'src/projects/projects.schema';

export type TaskDocument = Tasks & Document;

@Schema()
export class Tasks {
	@Prop({ required: true})
	body: string;
	@Prop()
	checked: boolean;
  @Prop({ type: Types.ObjectId, ref: Projects.name })
  projectId: Types.ObjectId;
}

export const TasksSchema = SchemaFactory.createForClass(Tasks);
