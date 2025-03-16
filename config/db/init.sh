#!/bin/bash

echo "Running initialization script..."

#
# Create a database for Keycloak
#
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ${KC_DB_NAME};"
# Create a user for Keycloak
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "CREATE USER IF NOT EXISTS '${KC_DB_USERNAME}'@'%' IDENTIFIED BY '${KC_DB_PASSWORD}';"
# Grant privileges to the keycloak user
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON ${KC_DB_NAME}.* TO '${KC_DB_USERNAME}'@'%';"
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;"

#
# Create a database for BEMED
#
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "CREATE DATABASE IF NOT EXISTS ${BEMED_DB_NAME};"
# Create a user for BEMED
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "CREATE USER IF NOT EXISTS '${BEMED_DB_USERNAME}'@'%' IDENTIFIED BY '${BEMED_DB_PASSWORD}';"
# Grant privileges to the bemed user
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "GRANT ALL PRIVILEGES ON ${BEMED_DB_NAME}.* TO '${BEMED_DB_USERNAME}'@'%';"
mariadb -u root -p${MARIADB_ROOT_PASSWORD} -e "FLUSH PRIVILEGES;"

echo "Database is ready"
