CREATE DATABASE consultas;

-- --------------------------------------------------------
-- Table structure for table 'USERS'
-- --------------------------------------------------------
CREATE TABLE consultas.users (
	id INT auto_increment NOT NULL,
	name varchar(150) NOT NULL,
	email varchar(200) NOT NULL,
	password varchar(300) NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table 'DEPENDENCIES'
-- --------------------------------------------------------
CREATE TABLE consultas.dependencies (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT dependencies_pk PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table 'DEFICIENCIES'
-- --------------------------------------------------------
CREATE TABLE consultas.deficiencies (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	CONSTRAINT deficiencies_pk PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table 'PATIENTS'
-- --------------------------------------------------------
CREATE TABLE consultas.patients (
	id INT auto_increment NOT NULL,
	ref_user INT NOT NULL,
	city varchar(50) NOT NULL,
	ref_deficiency INT NULL,
	ref_dependency INT NULL,
	CONSTRAINT patients_pk PRIMARY KEY (id),
	CONSTRAINT patient_user_FK FOREIGN KEY (ref_user) REFERENCES consultas.users(id),
	CONSTRAINT dependency_FK FOREIGN KEY (ref_dependency) REFERENCES consultas.dependencies(id),
	CONSTRAINT deficiency_FK FOREIGN KEY (ref_deficiency) REFERENCES consultas.deficiencies(id)
);

-- --------------------------------------------------------
-- Table structure for table 'EXAMS'
-- --------------------------------------------------------
CREATE TABLE consultas.exams (
	id INT auto_increment NOT NULL,
	ref_patient INT NOT NULL,
	name varchar(100) NOT NULL,
	date DATE NOT NULL,
	CONSTRAINT exams_pk PRIMARY KEY (id),
	CONSTRAINT exams_patient_FK FOREIGN KEY (ref_patient) REFERENCES consultas.patients(id)
);

-- --------------------------------------------------------
-- Table structure for table 'HOSPITALS'
-- --------------------------------------------------------
CREATE TABLE consultas.hospitals (
	id INT auto_increment NOT NULL,
	name varchar(100) NOT NULL,
	state varchar(2) NOT NULL,
	city varchar(50) NOT NULL,
	CONSTRAINT hospitals_pk PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table 'OCCUPATIONS'
-- --------------------------------------------------------
CREATE TABLE consultas.occupations (
	id INT auto_increment NOT NULL,
	name varchar(50) NOT NULL,
	CONSTRAINT occupation_pk PRIMARY KEY (id)
);

-- --------------------------------------------------------
-- Table structure for table 'DOCTORS'
-- --------------------------------------------------------
CREATE TABLE consultas.doctors (
	id INT auto_increment NOT NULL,
	ref_user INT NOT NULL,
	acad_education varchar(100) NOT NULL,
	ref_occupation INT NOT NULL,
	ref_hospital INT NOT NULL,
	CONSTRAINT doctors_pk PRIMARY KEY (id),
	CONSTRAINT doctor_user_FK FOREIGN KEY (ref_user) REFERENCES consultas.users(id),
	CONSTRAINT occupation_FK FOREIGN KEY (ref_occupation) REFERENCES consultas.occupations(id),
	CONSTRAINT hospital_FK FOREIGN KEY (ref_hospital) REFERENCES consultas.hospitals(id)
);

-- --------------------------------------------------------
-- Table structure for table 'QUERIES'
-- --------------------------------------------------------
CREATE TABLE consultas.queries (
	id INT auto_increment NOT NULL,
	ref_patient INT NOT NULL,
	ref_doctor INT NOT NULL,
	avaliation FLOAT NULL,
	CONSTRAINT queries_pk PRIMARY KEY (id),
	CONSTRAINT query_patient_FK FOREIGN KEY (ref_patient) REFERENCES consultas.patients(id),
	CONSTRAINT query_doctor_FK FOREIGN KEY (ref_doctor) REFERENCES consultas.doctors(id)
);

-- --------------------------------------------------------
-- Table structure for table 'MEDICAL CLEARANCES'
-- --------------------------------------------------------
CREATE TABLE consultas.medical_clearances (
	id INT auto_increment NOT NULL,
	ref_query INT NOT NULL,
	title varchar(50) NOT NULL,
	info varchar(200) NOT NULL,
	validity DATE NOT NULL,
	CONSTRAINT medical_clearances_pk PRIMARY KEY (id),
	CONSTRAINT query_FK FOREIGN KEY (ref_query) REFERENCES consultas.queries(id)
);

-- --------------------------------------------------------
-- Table structure for table 'SESSIONS'
-- --------------------------------------------------------
CREATE TABLE consultas.sessions (
	id INT auto_increment NOT NULL,
	ref_user INT NOT NULL,
	token varchar(255) NOT NULL,
	exp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT session_pk PRIMARY KEY (id)
);