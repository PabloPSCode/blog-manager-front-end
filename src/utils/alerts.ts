import toast from "react-hot-toast";

const showAlertError = (msg: string) =>
  toast.error(msg, {
    style: {
      fontSize: "13px",
    },
  });

const showAlertSuccess = (msg: string) =>
  toast.success(msg, {
    style: {
      fontSize: "13px",
    },
  });

const showAlertLoading = (msg: string) =>
  toast.loading(msg, {
    style: {
      fontSize: "13px",
    },
  });

export { showAlertError, showAlertLoading, showAlertSuccess };
