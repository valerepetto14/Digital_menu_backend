export const pagination = (limit: number, page: number) => {
    return {
        limite: limit ? parseInt(limit.toString()) : 10,
        pagina: page ? parseInt(page.toString()) : 1,
        offset: page ? page * (limit ? limit : 10) - (limit ? limit : 10) : 0
    }
};