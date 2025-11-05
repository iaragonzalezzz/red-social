export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  username: string;
  fechaNacimiento: string;
  descripcion: string;
  perfil: 'usuario' | 'administrador';
  imagenPerfil?: string;
}