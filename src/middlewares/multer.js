import { error } from "console";
import multer from "multer";
import path from 'path';
import {v4 as uuidv4} from 'uuid';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) =>{
        const ext = path.extname(file.originalname);
        const uniqueName = uuidv4() + ext;
        cb(null, uniqueName)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024},
    fileFilter : (req, file, cb) => {
        const allowedTypes = [
            "images/jpg",
            "images/jpge",
            "images/png",
            "images/HEIC",
            "aplication/pdf"
        ]
        if(!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("tipo de archivo no permitido"));
        }
        cb(null, true);
    }
})

export default upload;