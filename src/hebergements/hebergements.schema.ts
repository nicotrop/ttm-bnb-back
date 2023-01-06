import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HebergementsDocument = HydratedDocument<Hebergements>;

@Schema()
export class Hebergements {
  @Prop()
  company_name: string;

  @Prop()
  host_firstname: string;

  @Prop()
  host_lastname: string;

  @Prop()
  host_email: string;

  @Prop()
  private_code: string;

  @Prop()
  salt: string;

  @Prop()
  img_url: string;

  @Prop()
  slug: string;

  @Prop()
  token: string;
}

export const HebergementsSchema = SchemaFactory.createForClass(Hebergements);
