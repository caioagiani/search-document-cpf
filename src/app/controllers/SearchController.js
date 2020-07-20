const { get } = require("axios");

module.exports = {
  async show(req, res) {
    const { user, pass, base_url } = require("../../config");
    const { cpf } = req.query;

    const { data } = await get(
      `https://${base_url}/API/Query?USERNAME=${user}&PASSWORD=${pass}&SOURCE=BOOKPF&SEARCHKEY=OP=CPF|DOC=${cpf}`
    );

    const { Entities } = JSON.parse(data.OperationResult);

    res.json(Entities[0]);
  },
};
