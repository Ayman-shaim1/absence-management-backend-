import mongoose from "mongoose";

const Schema = mongoose.Schema;
const absenceSchema = Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  nbrHeures: {
    type: Number,
    required: true,
  },
  dateAbsence: {
    type: Date,
    required: true,
  },
});

const Absence = mongoose.model("absence", absenceSchema);
export default Absence;
