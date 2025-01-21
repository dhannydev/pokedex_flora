import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// Obtener todos los usuarios
export async function getAllUsers() {
    const [rows] = await pool.query(
        'Select * from users'
    );
    return rows;
}

// Autenticar usuario
export async function getUserByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ? LIMIT 1', [email]
    );
    return rows[0];
}


// Obtener id de usuario
export async function getIdUser(id) {
    const [rows] = await pool.query(
        'Select id from users WHERE id = ?', [id]
    );
    return rows;
}

// Insertar un nuevo usuario
export async function createUser(usuario, email, contrasena) {
    const [result] = await pool.query(
    `INSERT INTO users (usuario, email, contrasena)
    VALUES (?, ?, ?)`,
    [usuario, email, contrasena]
    );
    const userId = result.insertId;
    // Obtener los detalles del usuario recién creado
    const nuevoUsuario = await getIdUser(userId);
    // Puedes hacer algo con los datos del nuevo usuario
    console.log('Usuario creado:', nuevoUsuario);
}

// Eliminar usuario por id
export async function deleteUser(id) {
    const [result] = await pool.query(
        `DELETE FROM users
        WHERE id = ?;`,
        [id]
    );
    return result;
}

// Plantas

// Insertar una nueva planta
export async function createPlanta(nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas) {
    try {
        const [result] = await pool.query(
            `INSERT INTO plantas (nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas, cuestionario)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas], cuestionario
        );
        const plantaId = result.insertId;
        // Obtener los detalles de la planta recién creada
        const nuevaPlanta = await getPlantaById(plantaId);
        // Puedes hacer algo con los datos de la nueva planta
        console.log('Planta creada:', nuevaPlanta);
        return nuevaPlanta; 
    } catch (error) {
        console.error('Error al insertar la planta en la base de datos:', error);
        throw error; // Reenviar el error para manejarlo en el frontend si es necesario
    }
}

// Obtener todas las plantas
export async function getAllPlantas() {
    const [rows] = await pool.query(
        'SELECT * FROM Plantas'
    );
    return rows;
}

// Obtener planta por id
export async function getPlantaById(id) {
    const [rows] = await pool.query(
        'SELECT * FROM Plantas WHERE id = ?', [id]
    );
    return rows[0];
}


// Historial
// Función para insertar un registro en la tabla de historial
export async function insertarHistorial(id_usuario, id_planta, nombre_planta) { // Agregar el nuevo parámetro nombre_planta
    try {
      // Ejecutar la inserción en la base de datos
      await pool.query(
        'INSERT INTO historial (id_usuario, id_planta, nombre_planta) VALUES (?, ?, ?)', // Incluir también el nombre_planta en la inserción
        [id_usuario, id_planta, nombre_planta] // Pasar también el nombre de la planta
      );
      console.log('Registro insertado en el historial');
    } catch (error) {
      console.error('Error al insertar en el historial:', error);
      throw error; // Reenviar el error para manejarlo en el frontend si es necesario
    }
  }

  // Obtener registros por id
export async function getRegistrosByID(id_usuario) {
    const [rows] = await pool.query(
        'SELECT * FROM historial WHERE id_usuario = ?', [id_usuario]
    );
    return rows;
}

// Obtener registros de historial
export async function getAllRegistros() {
    const [rows] = await pool.query(
        'SELECT * FROM historial',
    );
    return rows;
}