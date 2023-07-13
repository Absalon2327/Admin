export interface IConsultaExcelTabla {
  tablaConsulta: ITablaConsulta[];
  tablaMedico: ITablaMedico[];
}

export interface ITablaConsulta {
  idPaciente: string;
  duiPaciente: string;
  nombreCompletoPaciente: string;
  emailPaciente: string;
  telefonoPaciente: string;
  direccionPaciente: string;
}


export interface ITablaMedico {
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
