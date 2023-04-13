import Swal from "sweetalert2";

export const XPAlertObj = () => {
  return {
    title: "Item Added",
    message: "",
    icon: "",
    infoButText: "OK",
    confirmButText: "Yes, Proceed",
    cancelButText: "No",
    redirectUrl: "",
    callback: null,
  };
};

export const XPInfoAlert = (alertObj) => {
  Swal.fire({
    title: `${alertObj.title}`,
    text: `${alertObj.message}`,
    icon: `${alertObj.icon}`,
    confirmButtonText: `${alertObj.infoButText}`,
  }).then(function () {
    if (alertObj.redirectUrl.length > 0) {
      window.location.href = alertObj.redirectUrl;
    }
    if (typeof alertObj.callback === "function") {
      alertObj.callback();
    }
  });
};

export const XPConfirmAlert = (alertObj) => {
  Swal.fire({
    title: `${alertObj.title}`,
    html: `${alertObj.message}`,
    icon: `${alertObj.icon}`,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: `${alertObj.confirmButText}`,
  }).then((result) => {
    if (result.isConfirmed && typeof alertObj.callback === "function") {
      alertObj.callback();
    }
  });
};