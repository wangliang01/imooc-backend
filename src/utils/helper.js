export function success(ctx, data = null, msg = 'success') {
  ctx.body = {
    code: 200,
    msg,
    data
  }
}

// 根据传入字段，将对象中的属性删除
export function deleteFields(obj, fields) {
  fields.forEach((field) => delete obj[field])
}
