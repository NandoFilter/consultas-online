-- --------------------------------------------------------
-- Values for table 'HOSPITALS'
-- --------------------------------------------------------
INSERT INTO consultas.hospitals 
   	(name, state, city)
VALUES
    ('Hospital Bruno Born', 'RS', 'Lajeado'),
    ('Hospital Beneficente Santa Terezinha', 'RS', 'Encantado'),
    ('Hospital Moinhos de Vento', 'RS', 'Porto Alegre'),
    ('Hospital Nove de Julho', 'SP', 'São Paulo'),
    ('Hospital Paraná', 'PR', 'Maringá'),
    ('Hospital Israelita Albert Einstein', 'SP', 'São Paulo');

-- --------------------------------------------------------
-- Values for table 'OCCUPATIONS'
-- --------------------------------------------------------
INSERT INTO consultas.occupations 
   	(name)
VALUES
    ('Cardiologista'),
    ('Clínico geral'),
    ('Dermatologista'),
    ('Geriatra'),
    ('Ginecologista'),
    ('Nutricionista'),
    ('Ortopedista'),
    ('Psicólogo'),
    ('Psiquiatra');

-- --------------------------------------------------------
-- Values for table 'DEFICIENCIES'
-- --------------------------------------------------------
INSERT INTO consultas.deficiencies 
   	(name)
VALUES
    ('Visual'),
    ('Motora'),
    ('Surdez'),
    ('Autismo'),
    ('Síndrome de Down');

-- --------------------------------------------------------
-- Values for table 'DEPENDENCIES'
-- --------------------------------------------------------
INSERT INTO consultas.dependencies 
   	(name)
VALUES
    ('Drogas Lícitas'),
    ('Drogas Ilícitas'),
    ('Emocional'),
    ('Tecnológica');