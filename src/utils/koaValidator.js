import { object } from "yup";
import { HttpException } from "./httpException";
export class KoaValidator {
  constructor(ctx, rules) {
    this.ctx = ctx;
    this.rules = rules;
    this.params = this.integrationParameter();
    this.validateSchema = object(rules);
  }
  integrationParameter() {
    let res = {};
    // 获取header参数
    let header = this.ctx.header;
    // 获取params参数
    let params = this.ctx.params;
    // 获取query参数
    let query = this.ctx.query;
    // 获取body参数
    let body = this.ctx.request.body;

    // 如果有同名参数，则覆盖，覆盖顺序为：header > params > query > body

    Object.keys(this.rules).forEach((key) => {
      if (header[key]) {
        res[key] = header[key];
      } else if (params[key]) {
        res[key] = params[key];
      } else if (query[key]) {
        res[key] = query[key];
      } else if (body[key]) {
        res[key] = body[key];
      }
    });

    return res;
  }
  async validate() {
    try {
      const result = await this.validateSchema.validate(this.params, { abortEarly: false, stripUnknown: true });
      return result;
    } catch (error) {
      throw new HttpException(error.errors[0].message, 10001);
    }
  }
}
