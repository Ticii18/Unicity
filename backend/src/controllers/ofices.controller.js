import Profession from '../models/ofices.model.js';

// Controlador para obtener todas las profesiones
export const getAllProfessions = async (req, res) => {
    try {
        const professions = await Profession.find();
        res.status(200).json(professions);
    } catch (error) {
        console.error('Error al obtener profesiones:', error);
        res.status(500).json({ message: 'Error al obtener las profesiones' });
    }
};

export const getProffession = async(req,res) =>{
    const id = req.params.id
    try {
        const profession = await Profession.findById(id)
        console.log(profession);
        if(!id){
            return res.status(404).json({ message: 'oficio no encontrado' });
        }
        res.status(200).json(profession)
    }catch(error){
        console.error('err')
        res.status(500).json({message: 'Error al obtener la profesion'})
    }
}

