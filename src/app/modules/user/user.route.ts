import express from 'express'; 
import { upload } from '../../config/multer';
import UserController from './user.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post('/', upload.single('image'), UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/', auth(USER_ROLE.admin), UserController.getUsers);
router.get('/:id', auth(USER_ROLE.admin, USER_ROLE.user), UserController.getUserById);
router.put('/:id', auth(USER_ROLE.admin, USER_ROLE.user), upload.single('image'), UserController.updateUser);
router.delete('/:id',auth(USER_ROLE.admin), UserController.deleteUser);
   

export const userRouter = router;
