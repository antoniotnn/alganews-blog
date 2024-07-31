import {differenceInDays, format, formatDistanceToNow} from 'date-fns';
import {ptBR} from "date-fns/locale";

export default function formatPostDate(postCreationDate: string) {
    const postDate = new Date(postCreationDate);
    const today = new Date();

    const dayDiff = differenceInDays(today, postDate);

    if (dayDiff > 3) {
        return format(postDate, 'dd/MM/yyyy');
    }

    return formatDistanceToNow(postDate, {
        locale: ptBR,
        addSuffix: true
    });
}