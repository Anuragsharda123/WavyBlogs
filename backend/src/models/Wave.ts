import User from "./User";
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as UUID} from 'uuid';

class Wave extends Model{
    public uuid!: string;
    public photo!: string;
    public video!: string;
    public status!: boolean;
    public isDeleted!: boolean;
    public deletedAt!: Date;
    public text!: string;
    public userId!: string;
    public user_wave!: User;
}

Wave.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: UUID,
        primaryKey: true,
        },
    photo: {
        type: DataTypes.STRING,
    },
    video: {
        type: DataTypes.STRING,
    },
    text: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
},{
    modelName: 'Wave',
    sequelize
})

User.hasMany(Wave, { foreignKey: 'userId', as: 'user_wave', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Wave.belongsTo(User, { foreignKey: 'userId', as: 'user_wave', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export default Wave