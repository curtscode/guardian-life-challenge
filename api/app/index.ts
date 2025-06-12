
import express from 'express';
import { sequelize, Client } from './db';
import clientRouter from './routes/clients';

const app = express();
const PORT = 3001;

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use('/clients', clientRouter);

async function seedClients() {
  const starWarsNames = [
    "Luke Skywalker", "Leia Organa", "Han Solo", "Darth Vader", "Obi-Wan Kenobi",
    "Yoda", "Anakin Skywalker", "Padmé Amidala", "R2-D2", "C-3PO",
    "Chewbacca", "Lando Calrissian", "Boba Fett", "Jango Fett", "Rey Skywalker",
    "Finn", "Poe Dameron", "Kylo Ren", "Snoke", "Palpatine",
    "Mace Windu", "Qui-Gon Jinn", "Jar Jar Binks", "Count Dooku", "General Grievous",
    "BB-8", "Maz Kanata", "Rose Tico", "Captain Phasma", "Wedge Antilles",
    "Bail Organa", "Mon Mothma", "Saw Gerrera", "K-2SO", "Cassian Andor",
    "Jyn Erso", "Galen Erso", "Chirrut Îmwe", "Baze Malbus", "Orson Krennic",
    "Bo-Katan Kryze", "Ahsoka Tano", "Ezra Bridger", "Hera Syndulla", "Thrawn",
    "Grogu", "Din Djarin", "Greef Karga", "Cara Dune", "Moff Gideon"
  ];

  const starWarsClients = starWarsNames.map((fullName, index) => {
    const [firstName, ...rest] = fullName.split(" ");
    const lastName = rest.join(" ") || "Skywalker";

    return {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@galaxy.com`,
      phone: `555-01${String(index).padStart(2, '0')}`,
      birthDate: `19${70 + (index % 30)}-05-04`,
      policyNumber: `SW-${index + 1}`,
      coverageAmount: 50000 + index * 1000,
      premium: 250 + index,
      address: `${index + 1} Jedi Way, Coruscant`,
    };
  });

  await Client.bulkCreate(starWarsClients);
}


(async () => {
  try {
    await sequelize.sync({ force: true });
    await seedClients();
    console.log('Database synced and seeded');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
})();
