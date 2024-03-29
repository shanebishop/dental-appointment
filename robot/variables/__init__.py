# Default variable values for common variables used in Robot tests

SERVER = 'http://localhost'
BROWSER = 'Firefox'

# Frontend URLs
HOME_URL = f'{SERVER}/'
LOGIN_URL = f'{SERVER}/auth/sign-in'
LOGOUT_URL = f'{SERVER}/auth/sign-out'
REGISTER_URL = f'{SERVER}/register-user'
COMPLETE_REGISTRATION_URL = f'{SERVER}/auth/complete-registration'
APPOINTMENTS_URL = f'{SERVER}/appointments/'
EDIT_APPOINTMENT_URL = f'{SERVER}/edit-appointment'
PROFILE_URL = f'{SERVER}/profile'
CLIENTS_URL = f'{SERVER}/clients'

# API URLs
DEREGISTER_URL = f'{SERVER}/api/user/deregister/'
GET_ALL_USERS_URL = f'{SERVER}/api/user/all/'
APPOINTMENTS_DETAILS_API_URL = f'{SERVER}/api/appointments/detail/'
APPOINTMENTS_LIST_API_URL = f'{SERVER}/api/appointments/list/'
