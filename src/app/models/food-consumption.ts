export interface FoodConsumption {
  idlistaalimentos?: number; // Declarado pero no enviado
  idcomida: number; // Este será tomado de localStorage
  idalimento: number; // Id del alimento seleccionado
  nombre: string;
  marca: string;
  calorias: number; // Recalculado
  proteina: number; // Recalculado
  carbohidratos: number; // Recalculado
  grasa: number; // Recalculado
  porcion: number; // Especificado por el usuario
  tipomedida: string;
  categoriacomida: string; // Elegido por el usuario
}
