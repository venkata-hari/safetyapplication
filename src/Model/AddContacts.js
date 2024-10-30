import mongoose from "mongoose";

const AddContactsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
    contacts: [
      {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        mobile: { type: String, unique: true, sparse: true } 
      }
    ]
  });
  

export default mongoose.model('AddContacts', AddContactsSchema);
