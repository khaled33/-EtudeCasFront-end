import {Auteur} from "./auteur";

export class Livre {
  id           ? :    number;
  titre          ?: string;
  isbn          ?: String;
  anneedition  ?: number;
  pages       ?: number;
  prix            ?: number;
  image      ?: string;
  resume        ?: string;
  idLivre?: number;
  auteurs?: Array<Auteur> ;
}
