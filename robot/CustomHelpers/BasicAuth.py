import base64


def generate_basic_auth(username, password):
    message_bytes = (username + ':' + password).encode('ascii')
    base64_bytes = base64.b64encode(message_bytes)
    return 'Basic ' + base64_bytes.decode('ascii')
