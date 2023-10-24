# challenge-grogu-rides-ts

# HOW STARTED TO CREATE THE PROJECT
npm init vite@latest challenge-grogu-rides-ts -- --template react-ts


# Create project
npx create-react-app challenge-grogu-rides-ts

# Build container with docker
docker build -t challenge-grogu-rides-ts --no-cache .

# Build container with nginx with docker
docker build -t challenge-grogu-rides-ts --no-cache .
docker build -t challenge-grogu-rides-ts-nginx --no-cache -f Dockerfile_nginx .
##docker build -t challenge-grogu-rides-ts --build-arg GROGU_RIDE_URL='http://localhost:8080'  --no-cache -f Dockerfile__nginx .

# Docker
docker run -p 3000:3000  -e REACT_APP_GROGU_RIDE="http://localhost:4040" --name car-front -d challenge-grogu-rides-ts
docker run -p 3000:80  -e REACT_APP_GROGU_RIDE="http://localhost:4040" --name car-front-prod -d challenge-grogu-rides-ts-nginx

# show all envrionment variables
printenv

