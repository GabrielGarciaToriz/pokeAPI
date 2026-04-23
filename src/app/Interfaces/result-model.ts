export interface ResultModel<T> {
    Correct : boolean,
    errorMesaje: string,
    ex : any,
    object: T,
    objects : T []
}
