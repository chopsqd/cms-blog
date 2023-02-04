const contentfulManagement = require("contentful-management")

module.exports = function() {
    const contentfulClient = contentfulManagement.createClient({
        accessToken: 'CFPAT-9LBiLrMLKM0LoeMlOUXemWF9idJsTq0n23nTjpJHAyc',
    })

    return contentfulClient
        .getSpace('ggar55z6g0w4')
        .then(space => space.getEnvironment('master'))
}