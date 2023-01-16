import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  filiere: {
    type: Schema.Types.ObjectId,
    ref: "filiere",
  },
});

const Student = mongoose.model("student", studentSchema);
export default Student;
