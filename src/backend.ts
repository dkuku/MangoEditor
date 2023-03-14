import { ServerAPI } from "decky-frontend-lib"

var server: ServerAPI | undefined = undefined;

export function resolvePromise(promise: Promise<any>, callback: any) {
    (async function () {
        let data = await promise;
        if (data.success) { callback(data.result) }
        else { callback(JSON.stringify(data)) }
    })();
}

export function callBackendFunction(promise: Promise<any>) {
    (async function () {
        await promise;
    })();
}

export function setServer(s: ServerAPI) {
    server = s;
}

export function save(config: string): Promise<any> {
  return server!.callPluginMethod("save", {"config": config});
}

export function load(level: number): Promise<any> {
    return server!.callPluginMethod("load", {"level": level});
}
