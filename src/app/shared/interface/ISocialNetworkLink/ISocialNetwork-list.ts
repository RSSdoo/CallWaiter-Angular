import { ISocialNetwork } from "./ISocialNetwork";

export interface ISocialNetworkLinkList {
    currentPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
    listOfObject: ISocialNetwork[];
}