import { model, Schema, mongoose } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      required: false,
    },
    contactType: {
      type: String,
      required: false,
      enum: ['work', 'home', 'personal'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    photo: {
      type: String,
      required: false,
      default: null,
    },
  },
  { timestamps: true },
);

export const ContactsCollection = model('contacts', contactsSchema);
