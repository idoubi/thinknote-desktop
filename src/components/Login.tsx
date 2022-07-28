import { useContext, useEffect, useState } from "react";
import {
  getLoginQrcode,
  checkLoginTicket,
  setTokenToCache,
} from "../apis/note";
import { NoteContext } from "../context/NoteContext";

export default () => {
  const { checkLogin } = useContext(NoteContext);
  const [qrcodeUrl, setQrcodeUrl] = useState("");
  const [ticket, setTicket] = useState("");

  const fetchLoginQrcode = async () => {
    const { code, message, data } = await getLoginQrcode();
    console.log("get login qrcode:", code, message, data);
    if (data && data.ticket) {
      setQrcodeUrl(data.qrcode_url);
      setTicket(data.ticket);
    }
  };

  const checkTicketHandler = async () => {
    const { code, message, data } = await checkLoginTicket({ ticket });
    console.log("check ticket:", ticket, code, message, data);
    if (data && data.token) {
      // 登录成功，缓存 token，提前 5 分钟过期
      setTokenToCache(data.token, data.expires_at - 300);
      // 重新检测登录
      await checkLogin();
    }
  };

  useEffect(() => {
    fetchLoginQrcode();
  }, []);

  useEffect(() => {
    if (ticket === "") {
      return;
    }

    const interval = setInterval(checkTicketHandler, 3000);
    console.log("check ticket start", ticket, interval);
    return () => {
      console.log("check ticket end", ticket, interval);
      clearInterval(interval);
    };
  }, [ticket]);

  return (
    <div>
      <h3 style={{ marginTop: "2em" }}>扫码登录，开启云端同步</h3>
      <img
        src={qrcodeUrl}
        alt="login_qrcode"
        style={{ width: "80%", marginTop: "2em", borderRadius: "10px" }}
      />
    </div>
  );
};
