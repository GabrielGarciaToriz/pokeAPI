export interface ResultModel<T> {
    correct: boolean;
    errorMessage?: string;
    errorCode?: string;
    object?: T;
    objects?: T[];
    ex: any;
}
