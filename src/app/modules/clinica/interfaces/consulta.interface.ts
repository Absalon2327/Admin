export interface IConsulta{
  idConsulta: number;
  nombrePaciente: string;
  nombreMedico: string;
  nombreEspecialidad: string;
  numConsultorio: string;
  fechaConsulta: string;
  horaConsulta: string;
}

export interface IEspecialidades{
  idEspecialidad: number;
  nombreEspeciadad:string;
}

export interface IPacientes{
  idPaciente: string;
  duiPaciente: string;
  nombreCompletoPaciente: string;
  emailPaciente: string;
  telefonoPaciente: string;
  direccionPaciente: string;
}

export interface IConsulta2{
  nombrePaciente: string;
  nombreMedico: string;
  nombreEspecialidad: string;
  fechaConsulta: string;
}

export interface IMedicos{
  id_medico: string;
  duiMedico: string;
  nombreMedico: string;
  apellidoMedico: string;
  correoMedico: string;
  telefonoMedico: string;
  direccionMedico: string;
  jvpm: string;
  nombreCompletoMedico: string;
}
