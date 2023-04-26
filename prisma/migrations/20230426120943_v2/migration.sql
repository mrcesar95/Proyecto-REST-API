/*
  Warnings:

  - You are about to drop the column `cedulaPaciente` on the `Cita` table. All the data in the column will be lost.
  - You are about to drop the column `tarjetaProfesional` on the `Cita` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cita" (
    "idCita" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "pacienteCedula" INTEGER,
    "medicoTarjetaProfesional" INTEGER,
    CONSTRAINT "Cita_pacienteCedula_fkey" FOREIGN KEY ("pacienteCedula") REFERENCES "Paciente" ("cedula") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Cita_medicoTarjetaProfesional_fkey" FOREIGN KEY ("medicoTarjetaProfesional") REFERENCES "Medico" ("tarjetaProfesional") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cita" ("fecha", "idCita") SELECT "fecha", "idCita" FROM "Cita";
DROP TABLE "Cita";
ALTER TABLE "new_Cita" RENAME TO "Cita";
CREATE TABLE "new_Medico" (
    "tarjetaProfesional" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "consultorio" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "idEspecialidad" INTEGER,
    CONSTRAINT "Medico_idEspecialidad_fkey" FOREIGN KEY ("idEspecialidad") REFERENCES "Especialidad" ("idEspecialidad") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Medico" ("apellido", "consultorio", "correo", "idEspecialidad", "nombre", "tarjetaProfesional") SELECT "apellido", "consultorio", "correo", "idEspecialidad", "nombre", "tarjetaProfesional" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
