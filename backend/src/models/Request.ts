import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as UUID } from 'uuid';
import User from "./User";

class Request extends Model{
    public uuid!: string;
    public request_status!: Number;
    public status!: boolean;
    public isDeleted!: boolean;
    public deletedAt!: Date;
    public sent_by!: string;
    public sent_to!: string;
}

Request.init({
    uuid:{
        type: DataTypes.UUID,
        defaultValue: UUID,
        primaryKey: true,
        allowNull: false
    },
    request_status:{
        type: DataTypes.INTEGER,
        defaultValue: 0  /* 0 for pending, 1 for accepted, 2 for rejected */
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    isDeleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    deletedAt:{
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    modelName: 'Friend',
    sequelize
})

User.hasMany(Request, { foreignKey:'sent_by', as:'sent_by_user', onDelete:'CASCADE', onUpdate:"CASCADE" });
Request.belongsTo(User, { foreignKey:'sent_by', as:'sent_by_user', onDelete:'CASCADE', onUpdate:"CASCADE" });

User.hasMany(Request, { foreignKey:'sent_to', as:'sent_to_user', onDelete:'CASCADE', onUpdate:"CASCADE" });
Request.belongsTo(User, { foreignKey:'sent_to', as:'sent_to_user', onDelete:'CASCADE', onUpdate:"CASCADE" });

export default Request;