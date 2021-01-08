import requests
import subprocess
import shlex
import sys


def delete_all_appointments(admin_auth_token, cancel_appointment_url, get_all_appointments_url):
    headers = {
        'Authorization': f'Token {admin_auth_token}'
    }

    response = requests.get(get_all_appointments_url, headers=headers)

    appointments = response.json()
    appointment_ids = [a['id'] for a in appointments]

    for appointment_id in appointment_ids:
        requests.delete(f'{cancel_appointment_url}{appointment_id}/', headers=headers)


def reset_appointments(admin_auth_token, cancel_appointment_url, get_all_appointments_url):
   """Restore appointments "table" to data defined in users fixture.

   Delete all appointments first (to prevent duplicates on restore), then load appointments fixture."""

   delete_all_appointments(admin_auth_token, cancel_appointment_url, get_all_appointments_url)

   # 'universal_newlines' is replaced with 'text' in python 3.7, but I'm using 3.6
   cmd = 'docker exec backend python3 backend/manage.py loaddata --no-color backend/fixtures/appointments.json'
   process = subprocess.Popen(shlex.split(cmd), stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
   stdout, stderr = process.communicate()

   if process.returncode != 0:
       print(stderr, file=sys.stderr)
       raise Exception(f'docker exec command had non-zero exit code {process.returncode}')
