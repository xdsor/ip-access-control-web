const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

export const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('ru-RU', dateTimeOptions).format(new Date(date)).replace(",", "")
}