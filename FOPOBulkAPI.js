class FOPOBulk {
    constructor(Key, direction, Files) {
        let ZIP = new JSZip();
        //deobfuscate || obfuscate

        direction = direction == "deobfuscate" ? "deobfuscate" : "obfuscate";

        let DataToSend = {
            "direction": direction || "",
            "input": "",
            "key": Key || ""
        };
        Object.defineProperty(this, 'Key', {
            get: function () {
                return key;
            }
        });
        Object.defineProperty(this, 'Direction', {
            get: function () {
                return direction;
            }
        });
        downloadFilesAsZip = function () {

        }
    }

}

class FileUploadTask{
    constructor(file){

    }
}