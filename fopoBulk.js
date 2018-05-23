// window.alert(chrome.extension.getURL("libs/jszip.js"));
// window.alert(runtime.getURL());

// var jqURL = chrome.extension.getURL("libs/jq.js");
// var jszipURL = chrome.extension.getURL("libs/jszip.js");
// var FileSaverURL = chrome.extension.getURL("libs/FileSaver.js");

// var jqx = document.createElement('SCRIPT');
// jqx.setAttribute("src",jqURL);;
// document.body.appendChild(jqx);
// console.log($);

//deobfuscate || obfuscate
window.ZIP = new JSZip();
window.FileSCount = 0;
window.FilesDone = 0;
window.direction = "obfuscate";
window.Keyzs = "";
var FileBrw = $("<input/>", {
    type: "file",
    webkitdirectory: "webkitdirectory",
    mozdirectory: "mozdirectory"
}).appendTo(document.body);

var DirectnElm = $("<input/>", {
    type: "checkbox",
    id: "direcxn",
    checked: 'checked'
}).appendTo(document.body);
var DirectnLblElm = $("<label/>", {
    for: "direcxn"
}).text('Type :').appendTo(document.body);
var KeyYYY = $("<input/>", {
    type: "text"
}).appendTo(document.body);

FileBrw[0].onchange = function (e) {

    window.FileSCount = 0;
    window.FilesDone = 0;
    window.ZIP = new JSZip();
    window.direction = !DirectnElm.is(":checked") ? "deobfuscate" : "obfuscate";
    window.Keyzs = KeyYYY.val();
    window.ZIP.file(`key`, Keyzs);

    // console.log(this.files);
    var AllUpFiles = Array.from(this.files);
    var FileNames = AllUpFiles.map(v => v.webkitRelativePath);
    // console.log(FileNames);
    // if (AllFiles[0]) {
    //     loadFileAsText(AllFiles[0]);
    // }

    var AllFiles = AllUpFiles.filter(function (fil_1) {
        var isPhpFile = fil_1.webkitRelativePath.search(/(.php)$/) > -1;
        if (!isPhpFile) {
            // window.ZIP
            var reader = new FileReader();
            // reader.readAsDataURL(fil_1);
            reader.readAsBinaryString(fil_1);
            reader.onload = function (ev) {

                // console.log(ev,reader.result);
                // debugger;//////.replace(/data:/g,'')
                window.ZIP.file(fil_1.webkitRelativePath, reader.result, {
                    "binary": true,
                    unixPermissions:777
                });
                window.FilesDone++;
        
                //   console.log(reader.result);
            };
            reader.onerror = function (error) {
                //   console.log('Error: ', error);
                window.FilesDone++;
            };
        
        }
        return isPhpFile;
    });

    // window.FileSCount = AllFiles.length;
    window.FileSCount = AllUpFiles.length;
    AllFiles.forEach(function (filx) {
        loadFileAsText(filx);
    });
};

function loadFileAsText(file) {
    var fileToLoad = file;

    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
        
        var textFromFileLoaded = fileLoadedEvent.target.result;
        // document.getElementById("inputTextToSave").value = textFromFileLoaded;
        // alert(textFromFileLoaded);
        jQuery.ajax({
            type: "POST",
            beforeSend: function (request) {

                // Proxy-Connection: keep-alive
                // Content-Length: 409667
                // Pragma: no-cache
                // Cache-Control: no-cache
                // Accept: application/json, text/plain, */*
                // Origin: http://fopo.com.ar
                // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
                // Content-Type: application/json;charset=UTF-8
                // Referer: http://fopo.com.ar/
                // Accept-Encoding: gzip, deflate
                // Accept-Language: en-US,en;q=0.9
                //*/

                request.setRequestHeader("Pragma", "no-cache");
                request.setRequestHeader("Cache-Control", "no-cache");
                // request.setRequestHeader("Accept", "application/json, text/plain, */*");
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                // request.setRequestHeader("Accept-Encoding", "gzip, deflate");
                request.setRequestHeader("Accept-Language", "en-US,en;q=0.9");
            },
            url: "http://www.fopo.com.ar/api/",
            data: JSON.stringify({
                "direction": window.direction,
                "input": textFromFileLoaded,
                "key": window.Keyzs
            }),
            processData: false,
            success: function (msg) {
                // console.log(msg);
                var Op = new String(msg.output).toString();
                // Op = OP.replace(/\/\*\nObfuscation([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g, ``);
                window.ZIP.file(fileToLoad.webkitRelativePath, Op,{
                    unixPermissions:"0777"                    
                });
                window.FilesDone++;

                if (window.FilesDone == window.FileSCount) {
                    window.ZIP.generateAsync({
                        type: "blob"
                    }).then(function (blob) { // 1) generate the zip file
                        saveAs(blob, `FOPO-BULK-${(new Date()).toJSON()}.zip`); // 2) trigger the download
                    }, function (err) {
                        jQuery("#blob").text(err);
                    });
                }
            }
        });
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}