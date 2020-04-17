const Crypto = require("crypto"); 

module.exports = async function (context, req) {
    var hmac = Crypto.createHmac("sha1", "Uvm/aEBb4FAQoGtZckpaoXhr4WaYOsOW0hEK8LuELjiW1oHhDaOpkA==");
    var signature = hmac.update(JSON.stringify(req.body)).digest('hex');
    var shaSignature =  `sha1=${signature}`;
    var gitHubSignature = req.headers['x-hub-signature'];
    if(!shaSignature.localeCompare(gitHubSignature)){
            context.log('JavaScript HTTP trigger function processed a request.');

            if (req.body.pages[0].title){
            context.res = {
                body: "Page is " + req.body.pages[0].title + ", Action is " + req.body.pages[0].action + ", Event Type is " + req.headers['x-github-event']
            };
        }
        else {
            context.res = {
                status: 400,
                body: ("Invalid payload for Wiki event")
            }
        }
    }else{
        context.res = {
            status : 401,
            body: ("Unauthorized request - signatures does not match.")
        }
    }
};
