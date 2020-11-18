const doctorPermissions = [ 'me', 'forgotPassword', 'resetPassword']
const patientPermisions  = [ 'me', 'forgotPassword', 'resetPassword']
const adminPermisions = ['me', 'register', 'verifyEmail', 'forgotPassword', 'resetPassword']

module.exports = {
    doctorPermissions,
    adminPermisions,
    patientPermisions
}