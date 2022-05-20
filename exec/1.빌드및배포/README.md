# 빌드 및 배포에 필요한 정보

>## 메인서버
</br>

## 1. 주요 버전
```cmd
1. JVM : 1.8.0_192
2. Web Server : Nginx 1.18.0
3. WAS : Tomcat 9.0.45
4. Visual Studio : 1.64.2
5. IntelliJ : IntelliJ IDEA 2021.3.2 (community)
6. React : 17.02
7. NodeJS : 16.13.2
8. springBootVer : '2.6.4'
9. solidity : 0.8.12
10. web3js : 1.7.1
11. 기타 상세 버전 정보
    - React : package.json
    - SpringBoot : build.gradle
```

<br/>

## 2. Dockerfile / Frontend

```docker
FROM node:16.13.2 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY  ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```
</br>

## 3. nginx.conf / Frontend
```docker
server {
    listen 80;
    listen [::]:80;
	
    # server_name 도메인;
    server_name k6e101.p.ssafy.io;

		access_log /var/log/nginx/access.log;
		error_log /var/log/nginx/error.log;

    location / {
        return 301 https://$server_name$request_uri; # http 접속 시 https 로 자동 접속
    }
}

server {
	client_max_body_size 20M;
	listen 443 ssl;
	listen [::]:443 ssl;
	
	# server_name 도메인;
	server_name k6e101.p.ssafy.io;

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	ssl_certificate /var/www/html/fullchain.pem;
	ssl_certificate_key /var/www/html/privkey.pem;

	root /usr/share/nginx/html;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;
	}

	location /api {
		proxy_pass https://k6e101.p.ssafy.io:8443;
	}

	location /nail {		
		proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "Upgrade";
    	proxy_set_header Host $host;
		proxy_pass http://k6e101.p.ssafy.io:8000;
	}

	location /websocket {
		proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "Upgrade";
    	proxy_set_header Host $host;
		proxy_pass http://k6e101.p.ssafy.io:8000;
	}
}
```
</br>

## 4. Dockerfile / Backend

```docker
FROM openjdk:8-jdk-alpine

# jar 파일 경로는 직접 입력해주세요.
COPY build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

## 배포용 properties 실행 명령어
ENTRYPOINT ["java","-jar","app.jar","--spring.config.name=application-prod"]

# 만약 배포용 properties를 사용하지 않는다면
# Default properties 실행 명령어
# ENTRYPOINT ["java","-jar","app.jar"]
```

</br>

## 5. application-prod.properties / Backend

```docker
#it will be set build date by gradle. if this value is @build.date@, front-end is development mode
build.date=@build.date@

# nginx.conf ? Backend port? ????.
server.port=8443
# ???? ??
#server.address=localhost
server.servlet.contextPath=/
# Charset of HTTP requests and responses. Added to the "Content-Type" header if not set explicitly.
server.servlet.encoding.charset=UTF-8
# Enable http encoding support.
server.servlet.encoding.enabled=true
# Force the encoding to the configured charset on HTTP requests and responses.
server.servlet.encoding.force=true

#database
spring.jpa.hibernate.naming.implicit-strategy=org.springframework.boot.orm.jpa.hibernate.SpringImplicitNamingStrategy
spring.jpa.hibernate.naming.physical-strategy=org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
spring.data.web.pageable.one-indexed-parameters=true
spring.datasource.url=jdbc:mysql://mirinail.com:3306/MIRINAIL?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.hikari.username= { Mysql.userName }
spring.datasource.hikari.password= { Mysql.userPassword }

# SQL log show
spring.jpa.show.sql=true
spring.jpa.properties.hibernate.format_sql=true
logging.level.org.hibernate.type.descriptor.spi.BasicBinder=trace

# jwt
jwt.secret= { jwt.secret.key }
# unit is ms. 15 * 24 * 60 * 60 * 1000 = 15days
jwt.refreshTokenExpiration=1296000000
jwt.accessTokenExpiration=216000000

#logging
logging.file.name=./logging/nailart.log
logging.level.root=INFO
logging.level.com.samsung.security=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.apache.tiles=INFO
logging.level.org.sringframework.boot=DEBUG
logging.level.org.sringframework.security=DEBUG

# console Color
spring.output.ansi.enabled=always

#AWS S3 Cloud key
cloud.aws.credentials.accessKey= { AWS.S3.accessKey }
cloud.aws.credentials.secretKey= { AWS.S3.secretKey }
cloud.aws.stack.auto=false

# AWS S3 Service bucket
cloud.aws.s3.bucket=mirinail-bucket
cloud.aws.region.static=ap-northeast-2

# AWS S3 Bucket URL
cloud.aws.s3.bucket.url=https://s3.ap-northeast-2.amazonaws.com/mirinail-bucket

# file upload limit
spring.servlet.multipart.max-file-size=20MB
spring.servlet.multipart.max-request-size=20MB
spring.http.multipart.enabled=true 
spring.http.multipart.location= /upload

# kakao social login
spring.security.oauth2.client.registration.kakao.client-id={ kakao.client.id }
spring.security.oauth2.client.registration.kakao.client-secret={ kakao.client.secret }
spring.security.oauth2.client.registration.kakao.client-authentication-method=post
spring.security.oauth2.client.registration.kakao.authorization-grant-type=authorization_code
spring.security.oauth2.client.registration.kakao.redirect-uri=https://k6e101.p.ssafy.io:8443/login/oauth2/code/kakao
spring.security.oauth2.client.registration.kakao.scope=profile_nickname, profile_image, account_email, gender, age_range
spring.security.oauth2.client.registration.kakao.client-name=Kakao

# Provider
spring.security.oauth2.client.provider.kakao.authorization-uri=https://kauth.kakao.com/oauth/authorize
spring.security.oauth2.client.provider.kakao.token-uri=https://kauth.kakao.com/oauth/token
spring.security.oauth2.client.provider.kakao.user-info-uri=https://kapi.kakao.com/v2/user/me
spring.security.oauth2.client.provider.kakao.user-name-attribute=id

# token Key & redirectUri
app.auth.token-secret= { auth.token.secret }
app.auth.token-expiry=1800000
app.auth.refresh-token-expiry=604800000
app.oauth2.authorizedRedirectUris=https://k6e101.p.ssafy.io/oauth2/redirect

# SSL setting
server.ssl.enabled=true
server.ssl.key-store-type=PKCS12
server.ssl.key-store=/root/key.p12
server.ssl.key-store-password= { ssl.password }
```

</br>

## 6. Docker-Compose.yml / Root
```docker
version: '3.7'

services: 
  frontend:
    image: frontend-react
    build:
      context: frontend/
      dockerfile: Dockerfile
    ports:
      - "80:80"
      - "443:443" 
    # [인증서 파일 저장 경로]:/var/www/html
    volumes:
      - /home/ubuntu/docker-volume/ssl:/var/www/html
    container_name: "frontend"
  
  backend:
    image: backend-spring
    build:
      context: backend/
      dockerfile: Dockerfile
    ports:
      - "8443:8443"  
        # [인증서 파일 저장 경로]:/root 
    volumes:
      - /home/ubuntu/docker-volume/ssl:/root
    container_name: "backend"
```

</br>

>## AR 서버 (GPU)

</br>

## 1. 주요 버전
```cmd
1. Python : 3.7
2. AWS : EC2 (p3.2xlarge)
2. Web Server : Nginx 1.18.0
3. PyCharm : 2022.1 (community)
4. Fastapi : 0.76.0
5. opencv-python : 4.5.5.64
6. tensorflow : 2.8.0
7. uvicorn : standard
8. websockets : 10.3
```
</br>

## 2. 실행 방법

```
    AI 폴더를 AWS GPU 서버의 /home/ubuntu/ 폴더로 복사

    $ cd AI

    위의 위치로 이동 후 해당 명령어 입력

    $ pip install -r moduelist.txt

    $ uvicorn main:app --host 0.0.0.0 --port 8001 --proxy-headers
```




</br>

# ERD
![ERD](./image/ERD.png)
