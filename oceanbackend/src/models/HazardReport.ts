import mongoose, { Schema, Document } from 'mongoose';

export interface IHazardReport extends Document {
  type: string;
  location: {
    lat: number;
    lng: number;
  };
  severity: number;
  description: string;
  reportedBy: mongoose.Types.ObjectId;
  timestamp: Date;
  imageUrl?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const HazardReportSchema: Schema = new Schema({
  type: {
    type: String,
    required: [true, 'Hazard type is required'],
    enum: ['Oil Spill', 'Debris', 'Pollution', 'Other'],
  },
  location: {
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
      min: -90,
      max: 90,
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
      min: -180,
      max: 180,
    },
  },
  severity: {
    type: Number,
    required: [true, 'Severity is required'],
    min: 1,
    max: 10,
  },
  description: {
    type: String,
    default: '',
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IHazardReport>('HazardReport', HazardReportSchema);

