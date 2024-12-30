import { Local } from './environment/env';
import express from 'express';
import sequelize from './config/db';
import cors from 'cors';
import userRouter from './routers/userRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRouter);

sequelize.sync({alter:true}).then(()=>{
    console.log('Database connected');
    
    app.listen(Local.SERVER_PORT,  () => {
        console.log(`Server is running on port ${Local.SERVER_PORT}`);
        });
}).catch((err)=>{
    console.log("Error: ", err);
})