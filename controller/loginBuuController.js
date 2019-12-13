var LdapClient = require('ldapjs-client')
class UserException {
    constructor(message) {
        this.message = message
        this.name = 'UserException'
        this.code = 501
    }
}
async function buuAuthen(username, password) {
    const AD_SERVER = '10.5.1.80'
    const AD_BASEDN = 'ou=People,dc=buu,dc=ac,dc=th'
    const ACCOUNT_SUFFIX = '@buu.ac.th'
    const AD_FILTER = '(cn=' + username + ')'
    var client = new LdapClient({ url: 'ldap://' + AD_SERVER })

    try {
        await client.bind(username + ACCOUNT_SUFFIX, password)
    } catch (e) {
        client.destroy()
        throw new UserException('Unable to authentication to BUU Domain')
    }
    try {
        const options = {
            filter: AD_FILTER,
            scope: 'sub'
        }
        const entries = await client.search(AD_BASEDN, options)
        client.destroy()
        return entries
    } catch (e) {
        client.destroy()
        throw new UserException('Unable to authentication to BUU Domain')
    }
}
exports.buuAuthen = buuAuthen