# Based on https://www.lambdatest.com/blog/selenium-python-behave-tutorial-bdd/

import os
import shlex
import subprocess
import sys
from configparser import ConfigParser
from helper.helper_web import get_browser


def before_all(context):
    config = ConfigParser()
    my_file = (os.path.join(os.getcwd(), 'setup.cfg'))
    config.read(my_file)

    # Reading the browser type from the configuration file for Selenium Python Tutorial
    helper_func = get_browser(config.get('Environment', 'Browser'))
    context.driver = helper_func


def after_all(context):
    context.driver.close()


def after_feature(context, feature):
    if 'database-reset-required' in feature.tags:
        this_file_path = os.path.dirname(os.path.realpath(__file__))
        project_root = os.path.realpath(os.path.join(
            this_file_path, '..', '..'
        ))

        cmd = f'sh {project_root}/scripts/reset_database.sh {project_root}/scripts/reset_database.py'
        process = subprocess.Popen(
            shlex.split(cmd), stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            print(stderr, file=sys.stderr)
            raise Exception(f'Reset database command had non-zero exit code {process.returncode}')
