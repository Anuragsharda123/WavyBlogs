import { Router } from "express";
import { userLogin, userList, Register, addorUpdatePreference,getUserPreference, 
    inviteFriend, updateProfilePhoto, updateUser, updateUserPassword, 
    createWave,
    getMyWaves,
    getRequests} from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth";
import { uploadWave } from "../utils/uploadWave";

const router = Router();

router.post('/login', userLogin);
router.post('/signup', Register);
router.post('/addwave', userAuthMiddleware, uploadWave.single('photo'), createWave );
router.post('/invite-friend', userAuthMiddleware, inviteFriend);

router.get('/getmywave', userAuthMiddleware, getMyWaves);
router.get('/getrequests', userAuthMiddleware, getRequests);

// router.get("/user-list", userList);

export default router;