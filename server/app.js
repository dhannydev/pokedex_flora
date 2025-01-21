import express from 'express';
import {
    createUser, getAllUsers, getIdUser, getUserByEmail, createPlanta, getAllPlantas, getPlantaById, insertarHistorial, getRegistrosByID,getAllRegistros, deleteUser
} from './database.js';
import cors from 'cors';

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET'],
    creddentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// Obtener todos los usuarios
app.get('/allusers', async (req, res) => {
    const user = await getAllUsers();
    res.status(200).send(user);
})

// Autenticación
app.post('/users', async (req, res) => {
    const { email, contrasena } = req.body;
    // Verificar si el usuario existe en la base de datos
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Verificar si la contraseña es correcta
    if (contrasena !== user.contrasena) {
        return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' });
    }
    // Si el usuario y la contraseña coinciden, se considera exitoso el inicio de sesión
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
});

// Obtener id de usuario
app.get('/users/:id', async (req, res) => {
    const user = await getIdUser(req.params.id);
    res.status(200).send(user);
});

// Crear un nuevo usuario
app.post('/register', async (req, res) => {
    const {usuario, email, contrasena} = req.body;
    const user = await createUser(usuario, email, contrasena);
    res.status(201).send(user);
});

// Eliminar usuario
app.delete("/users/:id", async (req, res) => {
    await deleteUser(req.params.id);
    res.send({message: "User deleted succesfully"});
});

// ADMIN
// Insertar una nueva planta
app.post('/plantas', async (req, res) => {
    const {nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas, cuestionario} = req.body;
    try {
        const planta = await createPlanta(nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas, cuestionario);
        res.status(201).send(planta);
    } catch (error) {
        console.error('Error al crear la planta:', error);
        res.status(500).send('Error al crear la planta');
    }
});

// Obtener todas las plantas
app.get('/plantas', async (req, res) => {
    const plantas = await getAllPlantas();
    res.status(200).send(plantas);
});

// Obtener planta por id
app.get('/plantas/:id', async (req, res) => {
    const planta = await getPlantaById(req.params.id);
    res.status(200).send(planta);
});

// Insertar registro de historial
app.post('/historial', async (req, res) => {
    const { id_usuario, id_planta, nombre_planta } = req.body;
    try {
      await insertarHistorial(id_usuario, id_planta, nombre_planta); // Pasar también el nombre de la planta
      res.status(200).send('Historial guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar en el historial:', error);
      res.status(500).send('Error al guardar en el historial');
    }
  });

// Obtener registros por id
app.get('/historial/:id_usuario', async (req, res) => {
    const registros = await getRegistrosByID(req.params.id_usuario);
    res.status(200).send(registros);
});

// Obtener todos los registros
app.get('/historial/', async (req, res) => {
    const registros = await getAllRegistros(req.params.id_usuario);
    res.status(200).send(registros);
});

// Consultar registro de historial

app.listen(3000, () => {
    console.log('Server running on port 3000');
});