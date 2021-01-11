#!/usr/bin/env sh
set -ex

DOCKER_COMPOSE_VERSION='1.27.4'

installDocker() {
    # This function is based off of https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

    # Install prerequisite packages
    sudo apt update
    sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

    # Add GPG key for Docker repository
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

    # Add Docker repository to APT sources
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $DISTRIB_CODENAME stable"

    # Update package database to pick up new Docker repository
    sudo apt update

    # Install Docker
    sudo apt-get install docker-ce

    # Confirm docker service is running
    sleep 1
    sudo systemctl is-active --quiet docker || { echo 'Docker service is not running'; exit 1; }

    # Enable running docker without sudo
    sudo usermod -aG docker "$USER"
    echo 'Please restart your shell to use the docker command without sudo.'
}

installDockerCompose() {
    sudo curl -sSL "https://github.com/docker/compose/releases/download/$DOCKER_COMPOSE_VERSION/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version
}

[ "$(uname -m)" = 'x86_64' ] || { echo 'This script can only be run on x86_64.'; exit 1; }

# shellcheck disable=SC1091
. /etc/lsb-release

[ "$DISTRIB_ID" = 'Ubuntu' ] || { echo 'This script can only be run on Ubuntu.'; exit 1; }

command -v curl >/dev/null 2>&1 || { echo 'Error: curl not found.'; exit 1; }

command -v docker >/dev/null 2>&1 || installDocker
command -v docker-compose >/dev/null 2>&1 || installDockerCompose

exit 0
