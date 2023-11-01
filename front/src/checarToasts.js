import { erro, aviso, sucesso } from "./toasts"

export function checarToast(){
    const toastr = localStorage.getItem("toastr");
    if (toastr) {
      const { msg, tipo } = JSON.parse(toastr);
      switch (tipo) {
        case "sucesso":
          sucesso(msg);
          break;
        case "erro":
          erro(msg);
          break;
        case "aviso":
          aviso(msg);
          break;
      }
      localStorage.removeItem("toastr");
    }
}