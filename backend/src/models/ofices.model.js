import mongoose from 'mongoose';

const professionSchema = new mongoose.Schema({
    profession: { type: String, required: true, unique: true },
});

const Profession = mongoose.model('Profession', professionSchema);
export default Profession;
