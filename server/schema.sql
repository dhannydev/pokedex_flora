CREATE DATABASE pokedex;

USE pokedex;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS plantas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_cientifico VARCHAR(255) NOT NULL,
    locacion VARCHAR(255),
    cuidados TEXT,
    tiempo_vida VARCHAR(255) NOT NULL,
    propiedades_medicas TEXT,
    cuestionario VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS historial (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_planta INT,
    nombre_planta VARCHAR(255) NOT NULL,
    consulta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES users(id),
    FOREIGN KEY (id_planta) REFERENCES plantas(id)
);



INSERT INTO plantas (nombre, locacion, cuidados, tiempo_vida, propiedades_medicas) 
VALUES (
    'Hierbabuena',
    'Exterior, clima templado',
    'Regar regularmente, luz solar indirecta',
    'Vive durante más de dos años, aunque si llegara a secarse, esta puede rebrotar de sus raices',
    'La hierbabuena tiene propiedades medicinales que pueden ayudar con problemas digestivos, como la indigestión y los gases. También se ha utilizado tradicionalmente como un antiséptico y para aliviar dolores de cabeza.'
);



INSERT INTO plantas (nombre, nombre_cientifico, locacion, cuidados, tiempo_vida, propiedades_medicas, cuestionario)
VALUES 
    ('Guayabo', 'Handroanthus serratifolius', 'Se encuentra principalmente en América del Sur, especialmente en Brasil.', 
    'Necesita un suelo bien drenado y tolera diferentes niveles de pH. Requiere riego regular durante su primer año de vida.',
    'Puede vivir hasta 50 años.',
    'Se le atribuyen propiedades antiinflamatorias y antioxidantes, pero debe usarse con precaución debido a posibles efectos secundarios.',
    'https://docs.google.com/forms/d/e/1FAIpQLSeAczV4GO-aI30berNgnV2MOXqRX6pk_MIqfIFlkXpDcoxung/viewform?usp=sf_link'),
    
    ('Pino', 'Pinus', 'Se encuentra en todo el mundo, especialmente en regiones templadas y frías del hemisferio norte.',
    'Necesita un suelo bien drenado y exposición al sol. Requiere poda regular para mantener su forma.',
    'Algunas especies pueden vivir hasta 1,000 años.',
    'La resina de pino se ha utilizado tradicionalmente para tratar afecciones respiratorias.',
    'https://forms.gle/FvsuwxCjcxff8hcY8'),
    
    ('Trueno', 'Spathodea campanulata', 'Originario de África tropical, se encuentra ahora en muchas regiones tropicales y subtropicales.',
    'Necesita un suelo bien drenado y riego regular. Tolera la sequía una vez establecido.',
    'Puede vivir hasta 50 años.',
    'No se conocen propiedades medicinales significativas.',
    'https://forms.gle/73owUHykFGYJi4cF6'),
    
    ('Sauce', 'Salix', 'Se encuentra en todo el mundo, especialmente en regiones húmedas y cerca de fuentes de agua.',
    'Necesita suelo húmedo y exposición al sol o sombra parcial. Requiere poda regular para mantener su forma.',
    'Puede vivir entre 30 y 50 años.',
    'La corteza de sauce se ha utilizado tradicionalmente como analgésico y antiinflamatorio.',
    'https://forms.gle/QgToru29SznuiNT8A');