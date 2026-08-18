export class DataView {
  private array: Uint8Array;

  get buffer(): ArrayBuffer {
    return this.array.buffer as ArrayBuffer;
  }

  get byteLength() {
    return this.array.byteLength;
  }

  get byteOffset() {
    return this.array.byteOffset;
  }

  constructor(buffer: ArrayBuffer, byteOffset?: number, byteLength?: number) {
    if (byteLength !== undefined) {
      this.array = new Uint8Array(buffer, byteOffset, byteLength);
    } else if (byteOffset) {
      this.array = new Uint8Array(buffer, byteOffset);
    } else {
      this.array = new Uint8Array(buffer);
    }
  }

  getUint4(byteOffset: number) {
    return this.array[byteOffset] & 0xf;
  }

  getUint8(byteOffset: number) {
    return (this.array[byteOffset] & 0xf) | ((this.array[byteOffset + 1] & 0xf) << 4);
  }

  getUint32(byteOffset: number) {
    let value = 0;
    value |= (this.array[byteOffset + 0] & 0xf) << 24;
    value |= (this.array[byteOffset + 1] & 0xf) << 28;
    value |= (this.array[byteOffset + 2] & 0xf) << 16;
    value |= (this.array[byteOffset + 3] & 0xf) << 20;
    value |= (this.array[byteOffset + 4] & 0xf) << 8;
    value |= (this.array[byteOffset + 5] & 0xf) << 12;
    value |= (this.array[byteOffset + 6] & 0xf) << 0;
    value |= (this.array[byteOffset + 7] & 0xf) << 4;
    return value;
  }

  getUint8Array(byteOffset: number, byteLength: number): ArrayLike<number> {
    // TypedArray.map() not supported on Android
    let array = new Uint8Array(byteLength);
    for (let i = 0; i != byteLength; ++i) {
      array[i] = this.array[byteOffset + i] & 0x0f;
    }
    return array;
  }

  setUint4(byteOffset: number, value: number): void {
    this.array[byteOffset] = value | 0x30;
  }

  setUint8(byteOffset: number, value: number): void {
    this.array[byteOffset] = (value & 0xf) | 0x30;
    this.array[byteOffset + 1] = (value >> 4) | 0x30;
  }

  toString(byteOffset?: number, byteLength?: number) {
    return String.fromCharCode.apply(null, [...this.subarray(byteOffset, byteLength)]);
  }

  static from(cmd: string, ...values: number[]) {
    let array = new Uint8Array(values.length + 2);
    let crc = array[0] = cmd.charCodeAt(0);
    for (let i = 0; i != values.length; ++i) {
      const value = values[i];
      array[i + 1] = 0x30 | value;
      crc += value;
    }
    array[array.length - 1] = 0x30 | (crc & 0xf);
    return new DataView(array.buffer);
  }

  static fromHex(cmd: string, s: string) {
    if (!/^[0-9A-Fa-f]+$/.test(s)) {
      throw new Error('Invalid ASCII hex characters');
    }
    const data = s.split('').map(c => c.charCodeAt(0));
    const array = new Uint8Array(data.length + 2);
    array[0] = cmd.charCodeAt(0);
    let crc = 0;
    const offset = cmd == "F" ? 2 : 1;
    for (let i = 0; i != data.length; ++i) {
      const value = data[i];
      array[i + offset] = value;
      crc += value & 0x0f;
    }
    if (cmd == "F") {
      array[1] = s.length;
    } else {
      array[array.length - 1] = 0x30 | (crc & 0xf);
    }
    return new DataView(array.buffer);
  }

  static fromString(s: string) {
    const values = s.split('').map(c => c.charCodeAt(0));
    const array = new Uint8Array(values);
    return new DataView(array.buffer);
  }

  private subarray(byteOffset?: number, byteLength?: number) {
    if (byteLength !== undefined) {
      return this.array.subarray(byteOffset, byteOffset + byteLength);
    } else if (byteOffset) {
      return this.array.subarray(byteOffset);
    } else {
      return this.array;
    }
  }
}
