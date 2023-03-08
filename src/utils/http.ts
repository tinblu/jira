import qs from "qs";
import * as auth from "auth_provider";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  //axios 和 fetch 的表现不一样， axios可以直接在返回状态不为2xx时抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        //拿到的token不合格或者有问题
        await auth.logout();
        window.location.reload(); //页面重新刷新
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data); //需要手动抛出异常 fetch的catch不会捕捉到500、401等报错，只会在断网或者网络异常时抛出，但这个概率很小
      }
    });
};
