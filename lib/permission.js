const doctorPermissions = [ 'me', 'forgotPassword', 'resetPassword', 'getAllDoctorAppointments']
const patientPermisions  = [ 'me', 'forgotPassword', 'resetPassword', 'makeAppointment', 'getAllPatientAppointments', 'uploadAppointmentsFile']
const adminPermisions = ['me', 'register', 'verifyEmail', 'forgotPassword', 'resetPassword']

module.exports = {
    doctorPermissions,
    adminPermisions,
    patientPermisions
}