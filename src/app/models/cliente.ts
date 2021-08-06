import { Endereco } from "./endereco";

export interface Cliente {

    id?: number;
    nome?: string;
    cpf?: string;
    endereco?: Endereco;
    telefones?: Telefone[];
    emails?: Email[]

}

export interface Telefone {
id?: number;
tipotelefone?: number;
numerotelefone?: number;
ddd?: number;
}

export interface Email {
    id?: number;
    endereco?: string;
}