// window.alert(chrome.extension.getURL("libs/jszip.js"));
// window.alert(runtime.getURL());

// var jqURL = chrome.extension.getURL("libs/jq.js");
// var jszipURL = chrome.extension.getURL("libs/jszip.js");
// var FileSaverURL = chrome.extension.getURL("libs/FileSaver.js");

// var jqx = document.createElement('SCRIPT');
// jqx.setAttribute("src",jqURL);;
// document.body.appendChild(jqx);
// console.log($);
var FileBrw = $("<input/>", {
    type: "file",
    webkitdirectory: "webkitdirectory",
    mozdirectory: "mozdirectory"
}).appendTo(document.body);

FileBrw[0].onchange = function (e) {
    // console.log(this.files);
    var AllFiles = Array.from(this.files);
    var FileNames = AllFiles.map(v => v.webkitRelativePath);
    // console.log(FileNames);
    if (AllFiles[0]) {
        loadFileAsText(AllFiles[0]);
    }

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
                request.setRequestHeader("Accept-Encoding", "gzip, deflate");
                request.setRequestHeader("Accept-Language", "en-US,en;q=0.9");
            },
            url: "http://www.fopo.com.ar/api/",
            data: JSON.stringify({
                "direction": "obfuscate",
                "input":textFromFileLoaded ,
                "key": ""
            }),
            processData: false,
            success: function (msg) {
                console.log(arguments);
            }
        });
    };

    fileReader.readAsText(fileToLoad, "UTF-8");
}