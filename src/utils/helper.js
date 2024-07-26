export function success(ctx, data = null, msg = 'success') {
  ctx.body = {
    code: 200,
    msg,
    data
  }
}