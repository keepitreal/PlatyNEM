import {async} from 'platypus';
import BaseService from './base.service';

export default class CrudService<T extends server.IBaseModel> extends BaseService {
    create(data: any, contentType?: string): plat.async.IAjaxThenable<number> {
        return this._post<number>({
            data: data,
            contentType: contentType || this._http.contentType.JSON
        });
    }

    read(): plat.async.IThenable<Array<T>>;
    read(...args: Array<any>): plat.async.IThenable<T>;
    read(id: number, ...args: Array<any>): plat.async.IThenable<T>;
    read(id?: any, ...args: Array<any>): plat.async.IThenable<any> {
        var params = this._utils.isNull(id) ? [] : [id];

        return this._get.apply(this, params.concat(args));
    }

    update(data: any, contentType?: string): plat.async.IThenable<T> {
        return this._put<T>({
            contentType: contentType || this._http.contentType.JSON,
            data: data
        }, data.id);
    }

    destroy(id: number): plat.async.IThenable<void> {
        return this._delete<void>(id);
    }
}
