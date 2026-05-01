# GBS SG App Template

Welcome 👋

This repository is a deployment template for your web app.  
You can use it to deploy your own project to the school infrastructure.

Your app will be published under your assigned domain, for example:

```text
https://app07.gbssg.russos.ch
```

---

# What this template does

When you push your code to GitHub:

1. GitHub Actions starts automatically
2. The app is deployed to the school server
3. Your app becomes available on your assigned URL

You do **not** need to configure the server yourself.

---

# Before you start

You need:

- a GitHub account
- access to the GitHub organization or template repo
- your assigned app ID, for example:
  - `app00`
  - `app07`
  - `app15`

You will also get the matching:

- port
- hostname

Example:

```yaml
app_id: app07
app_port: 3007
app_host: app07.gbssg.russos.ch
```

---

# Create your own repository from this template

## Step 1: Open the template repository

Open the provided template repo in GitHub.

## Step 2: Create your own repository

Click:

```text
Use this template
```

Then:

```text
Create a new repository
```

## Step 3: Name your repository

Use your assigned app ID as repository name.

Example:

```text
app07
```

This is important because the deployment checks that your repo name matches your app ID.

## Step 4: Create the repository

Now GitHub creates your own copy of the template.

---

# Clone the repository to your computer

Open a terminal and run:

```bash
git clone https://github.com/gbssg-russo/app07.git
cd app07
```

Replace `app07` with your real values.

---

# First deployment

## Step 1: Edit `app-config.yml`

Open the file:

```text
app-config.yml
```

Example:

```yaml
app_id: app07
app_port: 3007
app_host: app07.gbssg.russos.ch
```

Use **exactly** the values assigned to you.

Do not invent your own app ID, port, or hostname.

## Step 2: Commit and push

```bash
git add .
git commit -m "initial setup"
git push
```

## Step 3: Wait for deployment

GitHub Actions will start automatically.

You can see the deployment in GitHub under:

```text
Actions
```

## Step 4: Open your app

After the workflow finishes, open your assigned URL:

```text
https://app07.gbssg.russos.ch
```

---

# Project structure

A typical template repo looks like this:

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── package.json
│   └── server.js
├── Dockerfile
├── docker-compose.yml
├── app-config.yml
└── README.md
```

Important files:

- `app-config.yml`  
  contains your assigned app settings

- `Dockerfile`  
  describes how your application is built and started

- `docker-compose.yml`  
  describes how your container is run on the server

- `.github/workflows/deploy.yml`  
  triggers deployment automatically

---

# What you are allowed to change

You are expected to change your application code and, if needed, the Docker setup.

## Usually safe to change

- files inside your application folder
- `Dockerfile`
- dependencies
- source code
- framework configuration
- build commands
- start commands

## Usually **not** safe to change

- your assigned values in `app-config.yml` unless instructed
- workflow logic in `.github/workflows`
- deployment target
- hostnames and ports that are not yours

If you are unsure, ask first.

---

# How to run your own tech stack

This template is **not limited** to Node.js.

You can replace the example app with nearly any web application, as long as your container starts correctly and listens on the expected internal port.

The most important rule is:

## Your app must listen inside the container on port `3000`

The deployment expects your app to run internally on:

```text
3000
```

Your external port and public URL are mapped automatically by the infrastructure.

---

# Example: Node.js / Express

Example `Dockerfile`:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Your application should start on port `3000`.

Example in code:

```js
const port = 3000;
app.listen(port);
```

---

# Example: Static HTML / CSS / JS

If you only have static files, you can use Nginx.

Example `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 3000
CMD ["sh", "-c", "sed -i 's/listen       80;/listen 3000;/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
```

---

# Example: PHP

Example `Dockerfile`:

```dockerfile
FROM php:8.3-apache

WORKDIR /var/www/html
COPY . /var/www/html

RUN sed -i 's/80/3000/g' /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 3000
```

---

# Example: Python / Flask

Example `Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["python", "app.py"]
```

In your Flask app:

```python
app.run(host="0.0.0.0", port=3000)
```

---

# Example: Python / FastAPI

Example `Dockerfile`:

```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
```

---

# Example: Java / Spring Boot

Example `Dockerfile`:

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar

EXPOSE 3000

CMD ["java", "-jar", "app.jar", "--server.port=3000"]
```

---

# Example: Go

Example `Dockerfile`:

```dockerfile
FROM golang:1.24 AS build
WORKDIR /src
COPY . .
RUN go build -o app .

FROM debian:stable-slim
WORKDIR /app
COPY --from=build /src/app .

EXPOSE 3000

CMD ["./app"]
```

Your Go app should listen on port `3000`.

---

# Example: Frontend frameworks

## React / Vite / Vue / Angular

You usually have two choices:

### Option 1: build static files and serve them with Nginx
Good for frontend-only apps

### Option 2: run the dev server
Usually **not recommended** for production deployments

Preferred approach:
- build the project
- copy the build output into an Nginx image
- serve it on port `3000`

---

# Docker rules for this platform

## 1. One app = one container setup
Keep your project simple.

## 2. Internal port should be `3000`
Do not randomly change the internal listening port unless you also update the container setup correctly.

## 3. Do not expose your own public ports
The infrastructure handles public access.

## 4. Keep memory usage reasonable
Very large or inefficient apps may fail on shared infrastructure.

---

# Databases

Some apps do not need a database.

If your project needs one, ask your teacher which option you should use.

Possible setups:

- shared MariaDB
- shared PostgreSQL
- separate database for special cases

Do not expose databases publicly.

Do not hardcode passwords into your repository.

---

# Recommended way to modify this template

## For a simple new app

1. Keep:
   - `app-config.yml`
   - deployment workflow
   - `docker-compose.yml`

2. Replace:
   - app source code
   - dependencies
   - `Dockerfile`

3. Make sure:
   - the container starts correctly
   - the app listens on `3000`

---

# Minimal checklist before pushing

Before you push, check:

- [ ] repo name matches my assigned app ID
- [ ] `app-config.yml` contains my assigned values
- [ ] my app starts correctly
- [ ] my app listens on port `3000`
- [ ] my `Dockerfile` builds successfully
- [ ] I did not break the deployment workflow

---

# How to test locally

If you have Docker installed locally, test with:

```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
```

Then open:

```text
http://localhost:3000
```

If that works, your chances of successful deployment are much better.

---

# Troubleshooting

## My workflow does not start
Check:
- did you push to `main`?
- is GitHub Actions enabled?
- did you create the repo from the template correctly?

## The workflow fails during deployment
Check:
- `app-config.yml`
- Docker build errors
- wrong start command
- wrong internal app port

## My app deploys but does not open
Check:
- is the app listening on port `3000`?
- does the container stay running?
- are there errors in the logs?

## My container exits immediately
This usually means:
- wrong command
- missing dependency
- crash during startup

---

# Good workflow for your project

A good process is:

1. make small changes
2. commit often
3. push regularly
4. check GitHub Actions
5. test your URL

Example:

```bash
git add .
git commit -m "add login page"
git push
```

---

# Tips

- start small
- get a basic version running first
- only then add more features
- do not change too many things at once
- if deployment breaks, read the GitHub Actions logs carefully

---

# Summary

To use this template:

1. create your own repo from the template
2. set your assigned values in `app-config.yml`
3. replace the demo app with your own project
4. make sure your app listens on port `3000`
5. push to GitHub
6. open your assigned URL

---

# Need help?

If you are stuck, provide:

- your repo name
- your `app-config.yml`
- your `Dockerfile`
- the GitHub Actions error message

That usually makes debugging much easier.
