import { Injectable } from "@angular/core";
import { isArray } from "rxjs/internal/util/isArray";
import { isObject } from "rxjs/internal/util/isObject";
@Injectable()
export class QueryNetCore {
    
    constructor() {
    }

    toQueryString(object: any): string {
        let params = ``;
        let keys = Object.keys(object);
        keys.forEach(key => {
            params += this.addParam(object[key], key);
        });
        return params;
    }

    addParam(obj, prefix) {
        let param = ``;
        if (isObject(obj) && !isArray(obj)) {
            let keys = Object.keys(obj);
            keys.forEach(key => {
                param += this.addParam(obj[key], `${prefix}.${key}`);
            });
        }
        if (isArray(obj)) {
            obj.forEach(x => {
                param += `${prefix}=${x}&`;
            });
        }
        return param.length ? param : prefix += `=${obj}&`;
    }
}