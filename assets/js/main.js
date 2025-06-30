//GLOBAL VARIABLES
var icon, count;


//PACKAGE
function package(fun, type, content){
    switch (fun){
        case "popup":
            if (!document.getElementsByClassName("popup").length > 0){
                let elem = document.createElement("div");
                elem.classList.add("popup");
                document.body.appendChild(elem);
            }
            popup(type, content);
        break;
        case "remove":
            remove(type, content);
        break;
        default:
            return 0;
        break;
    }
}


//POPUP
const popup = (type, content) => {
    if (document.getElementsByClassName("popup").length > 0){
        if (type == "danger"){
            icon = '<iconify-icon icon="solar:danger-bold" class="icon icon_danger"></iconify-icon>';
        } else if (type == "warning"){
            icon = '<iconify-icon icon="ic:round-warning" class="icon icon_warning"></iconify-icon>';
        } else {
            icon = '<iconify-icon icon="icon-park-solid:success" class="icon icon_success"></iconify-icon>';
        }
        if (document.getElementsByClassName("alert").length > 0){
            document.getElementsByClassName("alert")[0].remove();
        }
        let len = document.getElementsByClassName("alert").length;
        let elem = document.createElement("section");
        elem.classList.add("alert");
        elem.id = "alert_"+len;
        elem.innerHTML = '<a href="javascript:void(0)" class="close" title="close" onclick="package(\'remove\', \'popup\' , \''+len+'\')"><i class="fa fa-times"></i></a><article><h3 class="title">'+icon+''+type+'</h3><p>'+content+'</p></article>';
        document.getElementsByClassName("popup")[0].appendChild(elem);
    }
};


//REMOVE
const remove = (type, ele) => {
    if (type == "popup"){
        document.getElementById("alert_"+ele).remove();
        if (!document.getElementsByClassName("alert").length > 0){ document.getElementsByClassName("popup").remove(); }
    }
};
