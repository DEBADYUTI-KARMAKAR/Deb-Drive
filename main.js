/*(function(){
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let fid = 0;
    let folders = [];

    btnAddFolder.addEventListener("click", addFolder);

    function addFolder(){
        let fname = prompt("Folder name?");
        if(!fname){
            return;
        }

        fid++;
        addFolderInPage(fname, fid);

        folders.push({
            id: fid,
            name: fname
        });
        persistFoldersToStorage();
    }

    function deleteFolder(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Do you want to delete the folder " + divName.innerHTML);
        if(flag == true){
            divContainer.removeChild(divFolder);
            
            let idx = folders.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
            folders.splice(idx, 1);
            persistFoldersToStorage();
        }
    }

    function editFolder(){
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let fname = prompt("Enter the new folder name");
        if(!fname){
            return;
        }

        divName.innerHTML = fname;

        let folder = folders.find(f => f.id == parseInt(divFolder.getAttribute("fid")));
        folder.name = fname;
        persistFoldersToStorage();
    }

    function addFolderInPage(fname, fid){
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        divName.innerHTML = fname;
        divFolder.setAttribute("fid", fid);

        let spanDelete = divFolder.querySelector("span[action='delete']");
        spanDelete.addEventListener("click", deleteFolder);

        let spanEdit = divFolder.querySelector("span[action='edit']");
        spanEdit.addEventListener("click", editFolder);

        divContainer.appendChild(divFolder);
    }

    function persistFoldersToStorage(){
        console.log(folders);
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFoldersFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            folders = JSON.parse(fjson);
            folders.forEach(function(f){
                addFolderInPage(f.name, f.id);
            })
        }
    }

    loadFoldersFromStorage();
})();
*/

(function () {
    let btnAddFolder = document.querySelector("#btnAddFolder");
    let divContainer = document.querySelector("#divContainer");
    let pageTemplates = document.querySelector("#pageTemplates");
    let folders = [];
    let fid = -1;

    btnAddFolder.addEventListener("click", addFolder);

    function addFolder() {
        let fname = prompt("Enter folder's name");
        if (!!fname) {
            let exists = folders.some(f => f.name == fname);
            if (exists == false) {
                fid++;
                folders.push({
                    id: fid,
                    name: fname
                });
                addFolderHTML(fname, fid);
                saveToStorage();
            } else {
                alert(fname + " already exists");
            }
        } else {
            alert("Please enter a name");
        }
    }

    function editFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");
        let ofname = divName.innerHTML;

        let nfname = prompt("Enter new name for " + ofname);
        if (!!nfname) {
            if (nfname != ofname) {
                let exists = folders.some(f => f.name == nfname);
                if (exists == false) {
                   // ram
                   let folder = folders.find(f => f.name == ofname);
                   folder.name = nfname;

                   // html
                   divName.innerHTML = nfname;

                   // storage
                   saveToStorage();
                } else {
                    alert(nfname + " already exists");
                }
            } else {
                alert("This is the old name only. Please enter something new.");
            }
        } else {
            alert("Please enter a name");
        }
    }

    // 10:49 to 10:55
    function deleteFolder() {
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[purpose='name']");

        let flag = confirm("Are you sure you want to delete " + divName.innerHTML + "?");
        if (flag == true) {
            // ram
            let fidx = folders.findIndex(f => f.name == divName.innerHTML);
            folders.splice(fidx, 1);

            // html
            divContainer.removeChild(divFolder);

            // storage
            saveToStorage();
        }
    }

    function addFolderHTML(fname, fid) {
        let divFolderTemplate = pageTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate, true);

        let divName = divFolder.querySelector("[purpose='name']");
        let spanEdit = divFolder.querySelector("[action='edit']");
        let spanDelete = divFolder.querySelector("[action='delete']");

        divFolder.setAttribute("fid", fid);
        divName.innerHTML = fname;
        spanEdit.addEventListener("click", editFolder);
        spanDelete.addEventListener("click", deleteFolder);

        divContainer.appendChild(divFolder);
    }

    function saveToStorage() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loadFromStorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson);
            folders.forEach(f => {
                if (f.id > fid) {
                    fid = f.id;
                }

                addFolderHTML(f.name, f.id);
            });
        }
    }

    loadFromStorage();
})();