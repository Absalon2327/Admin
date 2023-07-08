export interface IConsulta{
  idConsulta: number;
  nombrePaciente: string;
  nombreMedico: string;
  nombreEspecialidad: string;
  numConsultorio: string;
  fechaConsultario: string;
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

