import { Sequelize, DataTypes, Model } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'clients.sqlite', // Persistent file-based DB
  logging: false,
});

export class Client extends Model {}

Client.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    birthDate: {
      type: DataTypes.STRING,
    },
    policyNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    coverageAmount: {
      type: DataTypes.INTEGER,
    },
    premium: {
      type: DataTypes.FLOAT,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Client',
  }
);
