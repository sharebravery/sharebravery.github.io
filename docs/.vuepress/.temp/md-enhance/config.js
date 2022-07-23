import { defineClientConfig } from "@vuepress/client";
import Presentation from "D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.87/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "D:/MountainTop/Accompany/sharebravery/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.87/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Presentation", Presentation);
    
  }
});