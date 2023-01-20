import mongoose from "mongoose";

const Schema = mongoose.Schema;
const studentSchema = Schema({
  filiere: {
    ref: "filiere",
    type: Schema.Types.ObjectId,
    required: true,
  },
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
});

const Student = mongoose.model("student", studentSchema);
export default Student;
