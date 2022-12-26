# Create new network
```
docker network create nht-network
```
# Start Mysql: 
```
docker run --name=mysql -d \
    -e MYSQL_ROOT_PASSWORD=password \
    -e MYSQL_DATABASE=testdb \
    --network nht-network \
    --volume=/root/docker/mysql/conf.d:/etc/mysql/conf.d \
    -v /storage/docker/mysql-data:/var/lib/mysql \
    mysql:8
```
# Start Express server
```
docker build -t express-docker .
```
```
docker run --name express-docker \
    --env-file=.env \
    -p 3000:3000 \
    --network nht-network \
    express-docker:latest
```
# Migrate database
```
docker exec -it express-docker sh
npm run migrate
```
# Seed database
```
docker exec -it express-docker sh
npm run seed
```
# Express API routes
```
To get users: localhost:3000/users
```
```
To create an user: localhost:3000/users
```