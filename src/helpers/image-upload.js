import multer from "multer";
import path from "node:path"
import { fileURLToPath } from "node:url";
import Postagem from "../Models/BlogModel";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imageStorage = multer.diskStorage({
    destionarion: (req, file, cb) => {
        let folder = ""

        if(req.baseUrl.includes("usuarios")){
            folder = "usuarios"
        }else if(req.baseUrl.includes("postagens")){
            folder = "postagens"
        }

        cb(null, path.join(__dirname, `../public/${folder}`));
    },

    filename: (req, file,  res) =>{
        cb(null, 
            Date.now() +
            String(Math.floor(math.ramdom() * 10000)) +
            path.extname(file.originalname)
            );
    }

});

export const getTaskByID = async (req, res) =>{
    const PostagemId = req.params.id

    try{
        const postagem = await Postagem.findByPk(PostagemId)
        if(postagem){
            res.status(200).json(PostagemId)
        } else {
            res.status(404).json({
                message: "Tarefa não encontrada."
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            err: "Erro interno ao buscar tarefa."
        })
    }
}

export const updatePost = async (req, res) => {

    const paramValidation = updatePostagemSchema.safeParse(req.params);
    if (!paramValidation.success) {
      res.status(400).json({msg: "Numero de identificação está inválido",detalhes: formatZodError(paramValidation.error),});
        return
    }
  
    const { id } = req.params;
    const { titulo, conteudo, imagem } = req.body;
  
    const postagemAtualizada = {
      titulo,
      conteudo,
      imagem,
    };
    try {
      const [linhasAfetadas] = await Postagem.update(postagemAtualizada, {
        where: { id },
      });
      if (linhasAfetadas === 0) {
        res.status(404).json({ msg: "Postagem não encontrada" });
        return;
      }
      res.status(200).json({ msg: "Postagem Atualizada" });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao atualizar Postagem" });
    }
  };
  
const imageUpload = multer({ 

    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png||jpg||jpeg)$/)){
            return cb(new Error("Por favor, envie apenas jpg, png ou jpeg"))
        }
        cb(null, true)
    }
});

export default imageUpload;