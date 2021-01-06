import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export let toastMssg = (msg: any, type: any) => {
  return toast(msg, { type: type });
};

export let processStatus = (response: any) => {
  const { status } = response;
  if (status == 200) {
    return toastMssg(response["data"]["message"], "success");
  } else {
    return toastMssg(response["data"]["message"], "info");
  }
};
