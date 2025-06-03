import Swal, { SweetAlertIcon } from "sweetalert2";

const config = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const noNetWork = () => {
  Swal.fire({
    title: "Probleme de connexion",
    text: "La connexion au serveur a echoué",
    icon: "error",
  });
};

export const alertInfo = (
  icon: SweetAlertIcon,
  text: string,
  title?: string,
) => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
  });
};

export const noticeMe = (icon: SweetAlertIcon, title?: string) => {
  config.fire({
    icon: icon,
    title: title ?? "Operation réussie",
  });
};

export function confirmOperation(text: string, title?: string) {
  return Swal.mixin({
    title: title ?? "Confirmation",
    text: text,
    icon: "question",
    showCancelButton: true,
    showConfirmButton: true,
  });
}

export const sessionNotice = () => {
  config.fire({
    icon: "error",
    title: "Session inactive. Merci de vous réconnecter",
  });
};
