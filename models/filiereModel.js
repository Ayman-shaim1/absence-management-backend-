import mongoose from "mongoose";

const Schema = mongoose.Schema;
const filiereSchema = Schema({
  libelle: {
    type: String,
    required: true,
  },
});
const Filiere = mongoose.model("filiere", filiereSchema);
export default Filiere;
