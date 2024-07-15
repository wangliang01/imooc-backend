import { getHValue, setValue } from "../src/utils/redis";

// 测试

const init = async () => {
  await setValue("test", { name: "test", age: 18 });
  getHValue("test").then(res => {
   console.log(res)
 })
};

init()