#!/bin/bash -x
#------------------------------------------------------------------------------
# libs/baas-marqeta/marqeta-swagger-to-typescript-api.sh
#------------------------------------------------------------------------------

##
# Convert the marqeta swagger openapi spec to a typescript API and place the
# files in the ./src/openapi directory.
#
# NOTE: 
# Currently I am only exporting the "data-contracts.ts" which defines the 
# typescript interfaces.
#
npx swagger-typescript-api --clean-output --type-prefix "I" \
                           --no-client --axios --modular    \
                           -p https://raw.githubusercontent.com/marqeta/marqeta-openapi/main/yaml/CoreAPI.yaml \
                           -o ./src/openapi/