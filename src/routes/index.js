const request = require("request");

module.exports = (req, res) => {

    const { user, pass, base_url } = require("../config/index");
    const doc = req.query.cpf;
    const api = `https://${base_url}/API/Query?USERNAME=${user}&PASSWORD=${pass}&SOURCE=BOOKPF&SEARCHKEY=OP=CPF|DOC=${doc}`

    request(api, (error, reponse, body) => {
        const obj = JSON.parse(body);
        const json = JSON.parse(obj.OperationResult);

        json.Entities[0].People.forEach( (value) => {

            const {
                Name,
                Birthdate,
                Gender,
            } = value;

            const { RelatedPeople } = value;
            const Relatedname = RelatedPeople[0].Name;
            const RelatedBirthdate = RelatedPeople[0].Birthdate;
            const { RelationshipType } = RelatedPeople[0];
            const { IdNumber } = RelatedPeople[0];

            const result = {
                'name' : Name,
                'Birthdate' : Birthdate,
                'Gender' : Gender,
                'Family': Relatedname,
                'Ship type': RelationshipType,
                'Birthdate Family' : RelatedBirthdate,
                'CPF Family' : IdNumber
            }

            res.send(obj.OperationResult);
            // res.send(result);
        });
    });
};