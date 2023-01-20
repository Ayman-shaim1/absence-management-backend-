import mongoose from "mongoose";

const Schema = mongoose.Schema;
const absenceSchema = Schema({
  nbrHeures: {
    type: Number,
    required: true,
  },
  dateAbsence: {
    type: Date,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "student",
  },
});
const Absence = mongoose.model("absence", absenceSchema);
export default Absence;
