wget http://localhost:8081/q/openapi -O ./openapi.yaml && npx @openapitools/openapi-generator-cli generate -i ./openapi.yaml -g typescript-angular -o src/app/services

