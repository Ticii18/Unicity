import Curriculum from '../models/jobs.model.js';
import Profession from '../models/ofices.model.js';

export const searchCurriculums = async (req, res) => {
    try {
        const { query, profession } = req.query;

        let searchCriteria = {};

        if (query) {
            searchCriteria.name = { $regex: query, $options: 'i' };
        }

        if (profession) {
            try {
                const professionDoc = await Profession.findOne({ 
                    profession: { $regex: `^${profession}$`, $options: 'i' } 
                });
                
                if (professionDoc) {
                    searchCriteria.professionId = professionDoc._id;
                } else {
                    // Si no se encuentra la profesión, devolver array vacío
                    return res.status(200).json([]);
                }
            } catch (err) {
                console.error('Error buscando profesión:', err);
                // Si hay error buscando la profesión, continuar sin filtrar por profesión
            }
        }


        const curriculums = await Curriculum.find(searchCriteria)
            .populate('professionId')
            .select({
                name: 1,
                professionId: 1,
                userId: 1,
                profilePhoto: 1
            })
            .lean()
            .exec();

        
        res.status(200).json(curriculums);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ message: 'Error en la búsqueda', error });
    }
};