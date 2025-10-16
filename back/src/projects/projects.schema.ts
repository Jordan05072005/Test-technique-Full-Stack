import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/auth/auth.schema';

export type ProjectsDocument = Projects & Document;

@Schema()
export class Projects {
	@Prop({ required: true, unique: true })
	title: string;
	@Prop()
	description: string;
  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;
}

export const ProjectsSchema = SchemaFactory.createForClass(Projects);

