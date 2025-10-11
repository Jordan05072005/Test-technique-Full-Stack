import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/auth.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
	@Prop({ required: true, unique: true })
	title: string;
	@Prop()
	description: string;
  @Prop({ type: Types.ObjectId, ref: User.name })
  projectId: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

