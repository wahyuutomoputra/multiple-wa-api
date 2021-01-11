import {
    Model,
    Optional,
    DataTypes
} from "sequelize";
import DB from "../lib/system/database";

interface DeviceAtribut {
    id: number;
    name: string;
    description: string;
    status: "ONLINE" | "OFFLINE";
    apiKey: string;
    WABrowserId: string;
    WASecretBundle: string;
    WAToken1: string;
    WAToken2: string;
}

interface DeviceCreationAtribut extends Optional<
    DeviceAtribut,
    //optional column
    "id" | "WABrowserId" | "WASecretBundle" | "WAToken1" | "WAToken2"
    > { }

class Device extends Model<DeviceAtribut, DeviceCreationAtribut>
    implements DeviceAtribut {
    public id!: number;
    public description!: string;
    public name!: string;
    public status!: "ONLINE" | "OFFLINE";
    public apiKey!: string;
    public WABrowserId!: string;
    public WASecretBundle!: string;
    public WAToken1!: string;
    public WAToken2!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Device.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    apiKey: {
        type: DataTypes.STRING(300),
    },
    WABrowserId: {
        type: DataTypes.STRING(300)
    },
    WASecretBundle: {
        type: DataTypes.STRING(300)
    },
    WAToken1: {
        type: DataTypes.STRING(300)
    },
    WAToken2: {
        type: DataTypes.STRING(300)
    }
}, {
    sequelize: DB,
    freezeTableName: true,
    modelName: "devices"
});

export default Device;