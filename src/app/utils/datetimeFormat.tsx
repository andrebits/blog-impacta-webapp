import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function datetimeFormat(isoDate: string){

    const date = parseISO(isoDate);

    return format(date, "dd/MM/yyyy - HH:mm:ss", { locale: ptBR })
}