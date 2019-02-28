import { ElementCallback } from './element-callback-type';

export interface ElementDirectory {
    [selector: string]: ElementCallback[];
}
