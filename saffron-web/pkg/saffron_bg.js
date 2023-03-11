let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}


const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
* @private
*/
export class WasmCron {

    static __wrap(ptr) {
        const obj = Object.create(WasmCron.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcron_free(ptr);
    }
    /**
    * @param {string} s
    */
    constructor(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.wasmcron_new(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return WasmCron.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} s
    * @returns {Array<any>}
    */
    static parseAndDescribe(s) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(s, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.wasmcron_parseAndDescribe(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {boolean}
    */
    any() {
        const ret = wasm.wasmcron_any(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {Date} date
    * @returns {boolean}
    */
    contains(date) {
        const ret = wasm.wasmcron_contains(this.ptr, addHeapObject(date));
        return ret !== 0;
    }
    /**
    * @param {Date} date
    * @returns {Date | undefined}
    */
    nextFrom(date) {
        const ret = wasm.wasmcron_nextFrom(this.ptr, addHeapObject(date));
        return takeObject(ret);
    }
    /**
    * @param {Date} date
    * @returns {Date | undefined}
    */
    nextAfter(date) {
        const ret = wasm.wasmcron_nextAfter(this.ptr, addHeapObject(date));
        return takeObject(ret);
    }
}
/**
* @private
*/
export class WasmCronTimesIter {

    static __wrap(ptr) {
        const obj = Object.create(WasmCronTimesIter.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcrontimesiter_free(ptr);
    }
    /**
    * @param {WasmCron} cron
    * @param {Date} date
    * @returns {WasmCronTimesIter}
    */
    static startFrom(cron, date) {
        _assertClass(cron, WasmCron);
        const ret = wasm.wasmcrontimesiter_startFrom(cron.ptr, addHeapObject(date));
        return WasmCronTimesIter.__wrap(ret);
    }
    /**
    * @param {WasmCron} cron
    * @param {Date} date
    * @returns {WasmCronTimesIter}
    */
    static startAfter(cron, date) {
        _assertClass(cron, WasmCron);
        const ret = wasm.wasmcrontimesiter_startAfter(cron.ptr, addHeapObject(date));
        return WasmCronTimesIter.__wrap(ret);
    }
    /**
    * @returns {Date | undefined}
    */
    next() {
        const ret = wasm.wasmcrontimesiter_next(this.ptr);
        return takeObject(ret);
    }
}

export function __wbg_newwithlength_0da6f12fbc1ab6eb(arg0) {
    const ret = new Array(arg0 >>> 0);
    return addHeapObject(ret);
};

export function __wbg_wasmcron_new(arg0) {
    const ret = WasmCron.__wrap(arg0);
    return addHeapObject(ret);
};

export function __wbg_set_17224bc548dd1d7b(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
};

export function __wbindgen_number_new(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
};

export function __wbg_new_f127e324c1313064(arg0) {
    const ret = new Date(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbindgen_string_new(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export function __wbg_getTime_7c59072d1651a3cf(arg0) {
    const ret = getObject(arg0).getTime();
    return ret;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

