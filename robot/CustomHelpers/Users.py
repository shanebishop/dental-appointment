import requests


def delete_all_nonadmin_users(admin_auth_token, deregister_url, get_all_users_url):
    headers = {
        'Authorization': f'Token {admin_auth_token}'
    }

    response = requests.get(get_all_users_url, headers=headers)

    users = response.json()['users']

    non_admin_ids = [u['id'] for u in users]

    for user_id in non_admin_ids:
        requests.delete(deregister_url, data={'id': user_id}, headers=headers)
