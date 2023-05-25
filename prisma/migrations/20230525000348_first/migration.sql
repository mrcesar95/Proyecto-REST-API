-- CreateTable
CREATE TABLE "Paciente" (
    "cedula" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fechaNacimiento" DATETIME NOT NULL,
    "telefono" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Medico" (
    "tarjetaProfesional" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "consultorio" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "idEspecialidad" INTEGER,
    CONSTRAINT "Medico_idEspecialidad_fkey" FOREIGN KEY ("idEspecialidad") REFERENCES "Especialidad" ("idEspecialidad") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cita" (
    "idcita" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "pacienteCedula" INTEGER,
    "tarjetaProfesional" INTEGER,
    CONSTRAINT "Cita_tarjetaProfesional_fkey" FOREIGN KEY ("tarjetaProfesional") REFERENCES "Medico" ("tarjetaProfesional") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cita_pacienteCedula_fkey" FOREIGN KEY ("pacienteCedula") REFERENCES "Paciente" ("cedula") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Especialidad" (
    "idEspecialidad" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Especialidad_nombre_key" ON "Especialidad"("nombre");
