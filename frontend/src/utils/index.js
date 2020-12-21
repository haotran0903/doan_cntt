export const ErrorHelper = err => {
    if (!err.response)
        return 'Lỗi máy chủ'
    const message = err.response.data.name
    if (Array.isArray(message))
        return message.join('')
    return message
}

export const removeAccents = str => {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}