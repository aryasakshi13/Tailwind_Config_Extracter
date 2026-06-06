import {Schema, model, Document} from 'mongoose';

 
export interface IScan extends Document {
    userId: Schema.Types.ObjectId;
    siteUrl: string;
    siteName: string;
    sections: {
        [sectionName: string]: {
            colors: string[];
            fonts: string[];
            spaces: string[];

        }; 
    };
}
const ThemeSchema = new Schema<IScan>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        siteUrl :{
             type: String,
             required: true
        },
        siteName:{
            type: String
        },
        
        sections : {
            type: Map,
            of: new Schema({
                colors: [String],
                fonts: [String],
                spaces: [String]
            },{_id:false})

        }
    },{
        timestamps: true
    }
);

export const Theme = model<IScan>('Theme', ThemeSchema);