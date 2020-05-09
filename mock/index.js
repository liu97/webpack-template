module.exports = {
  // 在这里模拟后端数据
  'GET /user': { name: 'sohu' },
  'POST /login/account': (req, res) => {
    const { password, username } = req.body
    if (password === '1111' && username === 'sohu') {
      return res.send({
        status: 'ok',
        code: 0,
        token: 'itistoken',
        data: { id: 1, name: 'sohu' }
      })
    } else {
      return res.send({ status: 'error', code: 403 })
    }
  }
}