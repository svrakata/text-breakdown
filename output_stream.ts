import fs, { WriteStream } from "fs"
import { Transform } from "stream"

class OutputStream extends Transform {
    public writeStream: WriteStream

    constructor(public filePath: string) {
        super()
        this.writeStream = fs.createWriteStream(this.filePath)
    }

    public _transform(chunk, _, next) {
        this.writeStream.write(chunk)
    }
}

export default OutputStream
