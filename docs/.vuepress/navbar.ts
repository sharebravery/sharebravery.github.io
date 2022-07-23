/*
 * @Description: ^_^
 * @Author: sharebravery
 * @Date: 2022-07-16 09:23:51
 */
import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/home",
  { text: "服务器", icon: "icon-emmet", link: "/server/CCAA" },
  { text: "行星轨迹", icon: "solar-system", link: "/timeline/" },
  // {
  //   text: "星空探测",
  //   icon: "ufo-beam",
  //   link: "",
  // },
]);
