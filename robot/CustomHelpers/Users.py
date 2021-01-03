import requests
import subprocess
import shlex
import sys


def delete_all_nonadmin_users(admin_auth_token, deregister_url, get_all_users_url):
    headers = {
        'Authorization': f'Token {admin_auth_token}'
    }

    response = requests.get(get_all_users_url, headers=headers)

    users = response.json()['users']

    non_admin_ids = [u['id'] for u in users]

    for user_id in non_admin_ids:
        requests.delete(deregister_url, data={'id': user_id}, headers=headers)


def get_register_token(username):
    cmd = f"sh -c 'docker exec -i -e '\\''USERNAME={username}'\\'' backend backend/manage.py shell < " \
          f"robot/CustomHelpers/get_register_token.py'"
    process = subprocess.Popen(
        shlex.split(cmd), stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        print(stderr, file=sys.stderr)
        raise Exception(f'docker exec command had non-zero exit code {process.returncode}')

    return stdout.rstrip()
