const dns = require('dns')

dns.lookup('fszxccezxoweolasdxcqe.com',(err,address) => {

  if(err) throw err;

  console.log(address)

})