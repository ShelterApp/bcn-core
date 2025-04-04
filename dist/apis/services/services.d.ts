import { QueryParams } from "../base";
import { Service, City, Zip } from "../../models";
import { ListOfServiceIds, AvailableBed, SearchCityOrZip } from "./types";
declare function list(queryParams?: QueryParams): Promise<ReadonlyArray<Service>>;
declare function count(queryParams?: QueryParams): Promise<number>;
declare function create(data: any): Promise<Service>;
declare function get(id: string, queryParams?: QueryParams): Promise<Service>;
declare function update({ id, ...data }: Service): Promise<Service>;
declare function del(id: string): Promise<Service>;
declare function likes(id: string): Promise<Service>;
declare function approveServices(data: ListOfServiceIds): Promise<void>;
declare function removeServices(data: ListOfServiceIds): Promise<void>;
declare function listBeds(): Promise<ReadonlyArray<Service>>;
declare function updateAvailableBeds(data: ReadonlyArray<AvailableBed>): Promise<void>;
declare function searchCityOrZip(data: SearchCityOrZip): Promise<{
    readonly cities: readonly City[];
    readonly zips: readonly Zip[];
}>;
declare const _default: {
    list: typeof list;
    count: typeof count;
    create: typeof create;
    get: typeof get;
    update: typeof update;
    del: typeof del;
    likes: typeof likes;
    approveServices: typeof approveServices;
    removeServices: typeof removeServices;
    listBeds: typeof listBeds;
    updateAvailableBeds: typeof updateAvailableBeds;
    searchCityOrZip: typeof searchCityOrZip;
};
export default _default;
export { list, count, create, get, update, del, likes, approveServices, removeServices, listBeds, updateAvailableBeds, searchCityOrZip, };
