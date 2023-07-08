export interface IConsultaExcelTabla{
tablaConsulta: ITablaConsulta[];
}

export interface ITablaConsulta{
  idPaciente: string;
  duiPaciente: string;
  nombreCompletoPaciente: string;
  emailPaciente: string;
  telefonoPaciente: string;
  direccionPaciente: string;
}
