import {
    Model,
    Optional,
    DataTypes
} from "sequelize";
import DB from "../lib/system/database";

interface MessagesAtribut {
    id: number;
    from: string;
    to: string;
    type: string
    timestamp: string;
    location: string;
    isForwarded: boolean;
    body: string;
    fromMe: boolean;
}

//optional column
interface MessagesCreationAtribut extends Optional<MessagesAtribut, "id"> { }

class Messages extends Model<MessagesAtribut, MessagesCreationAtribut>
    implements MessagesAtribut {
    public id!: number;
    public from!: string;
    public to!: string;
    public type!: string;
    public timestamp!: string;
    public location!: string;
    public isForwarded!: boolean;
    public body!: string;
    public fromMe!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Messages.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    from: {
        type: DataTypes.STRING
    },
    isForwarded: {
        type: DataTypes.STRING
    },
    location: {
        type: DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.STRING
    },
    to: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.STRING
    },
    body: {
        type: DataTypes.STRING
    },
    fromMe: {
        type: DataTypes.STRING
    }
}, {
    sequelize: DB,
    modelName: "messages",
    freezeTableName: true
});

export default Messages;

