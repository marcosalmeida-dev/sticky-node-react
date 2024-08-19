import mongoose, { Document, Schema } from 'mongoose';

export interface ISticky extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
}

const stickySchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Sticky = mongoose.model<ISticky>('Sticky', stickySchema);
