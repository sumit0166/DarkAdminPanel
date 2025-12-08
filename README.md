# eCommerce Admin Panel Dashboard

A modern React-based admin panel for managing eCommerce operations with role-based access control, inventory management, and comprehensive dashboard features.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Application Structure](#application-structure)
- [Tech Stack](#tech-stack)
- [Configuration](#configuration)
- [Docker Setup](#docker-setup)
- [Nginx Configuration](#nginx-configuration)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Project Architecture](#project-architecture)
- [Role-Based Access Control](#role-based-access-control)

---

## 🎯 Project Overview

This is a **React + Redux** based admin dashboard frontend for an eCommerce platform. It provides:

- User authentication & session management
- Role-based access control (RBAC)
- Inventory management (Add, Edit, View, Delete products)
- Dashboard with analytics
- Settings and profile management
- Mobile-responsive navigation
- Secure API communication with backend

**Version:** 1.0.2

---

## 📁 Application Structure

```
dash/
├── public/                          # Static assets
│   ├── index.html                  # Main HTML file
│   ├── manifest.json               # PWA manifest
│   ├── config.json                 # Application configuration
│   └── robots.txt                  # SEO configuration
│
├── src/                            # Source code
│   ├── App.js / App.css           # Root component
│   ├── index.js / index.css       # Application entry point
│   ├── Firebase.js                # Firebase configuration
│   ├── setupProxy.js              # Development proxy setup
│   │
│   ├── frontend/                  # Frontend components
│   │   ├── Login.js / Login.css   # Login page
│   │   ├── Header/                # Header & Navigation
│   │   │   ├── Header.js
│   │   │   ├── Navparam.js        # Parameter-based navigation
│   │   │   └── NavMobile.js       # Mobile responsive nav
│   │   │
│   │   └── Body/                  # Main content area
│   │       ├── Body.js
│   │       ├── Inventory/         # Inventory management
│   │       │   ├── Inventory.js   # Inventory list view
│   │       │   ├── AddProduct.js  # Add new products
│   │       │   ├── ShowProduct.js # Product details
│   │       │   ├── FilterBtns.js  # Filtering controls
│   │       │   ├── SelectBox.js   # Select dropdown
│   │       │   ├── ShowFiles.js   # File management
│   │       │   └── ModNav.js      # Module navigation
│   │       │
│   │       ├── View/              # Data viewing & editing
│   │       │   ├── View.js        # Main view component
│   │       │   ├── Item.js        # Individual item display
│   │       │   ├── EditBox.js     # Edit form component
│   │       │   └── TableFilter.js # Table filtering
│   │       │
│   │       ├── Remove/            # Deletion management
│   │       │   └── Remove.js
│   │       │
│   │       ├── PassCh/            # Password change
│   │       │   └── ChPass.js
│   │       │
│   │       └── Settings/          # Settings & configuration
│   │           ├── Settings.js
│   │           └── pages/
│   │               └── Microservices.js
│   │
│   ├── redux/                      # Redux state management
│   │   ├── store.js               # Redux store configuration
│   │   └── LoginSlice.js          # Login state slice
│   │
│   └── img/                       # Image assets
│
├── nginx/                          # Nginx configuration
│   ├── nginx.conf                 # Main Nginx config
│   └── templates/
│       └── default.conf.template  # Server template with env vars
│
├── Dockerfile                      # Docker image definition
├── package.json                    # NPM dependencies & scripts
├── dashboard-deployment.yaml       # Kubernetes deployment
└── README.md                       # This file
```

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.2.0 - UI library
- **Redux** (@reduxjs/toolkit) - State management
- **React Router** v6 - Client-side routing
- **Axios** - HTTP client for API calls

### Styling & UI
- **CSS** - Custom styling
- **react-hot-toast** - Toast notifications
- **Iconsax React** - Icon library
- **React Auto Animate** - Smooth animations

### State Management
- **Redux Toolkit** - Modern Redux
- **Redux Persist** - Local storage persistence

### Development
- **React Scripts** - Build & dev tools
- **Testing Library** - Component testing

### Backend Integration
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Firebase** - Backend services

### Deployment
- **Docker** - Containerization
- **Nginx** - Reverse proxy & static serving
- **Kubernetes** - Orchestration

---

## ⚙️ Configuration

### Application Configuration (`public/config.json`)

```json
{
    "sessionExpiredType": "Hrs",
    "sessionExpiredTime": 5,
    "host": "http://webapp:8082",
    "defaultPage": "/Settings",
    "maxImageUpload": 4,
    "version": "1.0.2",
    "roles": {
        "read_only": {
            "accessDeniedPages": ["/Order", "/Sales"]
        },
        "ext_1": {
            "accessDeniedPages": ["/Order", "/Sales", "/Report", "/Document", "/Inventory"],
            "defaultPage": "/Dashboard"
        },
        "ext_2": {
            "accessDeniedPages": ["/Order", "/Sales", "/Report", "/Dashboard", "/Inventory"],
            "defaultPage": "/Document"
        },
        "super": {
            "accessDeniedPages": []
        }
    }
}
```

### Key Configuration Properties

| Property | Description | Value |
|----------|-------------|-------|
| `sessionExpiredTime` | Session expiration time | 5 hours |
| `host` | Backend API URL | `http://webapp:8082` |
| `defaultPage` | Default landing page | `/Settings` |
| `maxImageUpload` | Max simultaneous uploads | 4 files |
| `version` | App version | 1.0.2 |

---

## 🐳 Docker Setup

### Dockerfile

The application uses a **multi-stage approach** with Nginx:

```dockerfile
FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY build/. .

EXPOSE 80
```

### Build Process

1. **Stage 1**: React build creates optimized production build in `/build` folder
2. **Stage 2**: Nginx serves static files and proxies API requests

### Building Docker Image

```bash
# Build the React application
npm run build

# Build Docker image
docker build -t adminui:1.0.2 .
```

### Running Docker Container

```bash
# Run container with backend URL configuration
docker run -p 80:3000 \
  -e BACKEND_URL=http://backend:8082 \
  sumitsakpal/adminui:1.0.2
```

---

## 🌐 Nginx Configuration

### Main Nginx Config (`nginx/nginx.conf`)

- **Worker processes**: Auto (adjusts to CPU cores)
- **Connections**: 1024 per worker
- **Keep-alive timeout**: 65 seconds
- **Environment variable**: `BACKEND_URL` (passed at runtime)

### Server Configuration (`nginx/templates/default.conf.template`)

#### Static Files Serving
```nginx
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
}
```

#### API Reverse Proxy
```nginx
location /api/ {
    proxy_pass ${BACKEND_URL};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

**Features:**
- Environment variable substitution for `BACKEND_URL`
- Proper header forwarding for API requests
- Error handling for 50x errors
- Single Page Application (SPA) support

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 14+ and npm
- Docker (for containerized deployment)
- Kubernetes (for K8s deployment)

### Local Development

```bash
# Install dependencies
npm install

# Start development server with proxy
npm start

# Build for production
npm run build

# Run tests
npm test
```

### Environment Setup

The application includes a **development proxy** (`setupProxy.js`) that routes API calls to the backend during development.

**Development:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8082` (proxied via setupProxy)

**Production:**
- Served via Nginx with environment variable `BACKEND_URL`

---

## 🚀 Running the Application

### Development Mode

```bash
npm start
```
- Hot reload enabled
- API proxy configured in `setupProxy.js`
- Access: http://localhost:3000

### Production Build

```bash
npm run build
```
Creates optimized build in `/build` directory

### Docker Compose (Full Stack)

Set `BACKEND_URL` environment variable when running the container:

```bash
docker run -p 80:80 \
  -e BACKEND_URL=http://backend-service:8082 \
  adminui:1.0.2
```

---

## 📡 Deployment

### Kubernetes Deployment

The project includes a Kubernetes deployment manifest (`dashboard-deployment.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dashboard-deployment
  labels:
    app: dashboard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: dashboard
  template:
    metadata:
      labels:
        app: dashboard
    spec:
      containers:
        - name: ui
          image: sumitsakpal/adminui:1.0.2
          ports:
            - containerPort: 80
```

### Deploy to Kubernetes

```bash
kubectl apply -f dashboard-deployment.yaml
```

---

## 🏗️ Project Architecture

### Component Hierarchy

```
App
├── Login (authentication page)
└── Body (main application)
    ├── Header
    │   ├── Navparam (desktop nav)
    │   └── NavMobile (mobile nav)
    └── Content Area
        ├── Inventory Module
        ├── View/Edit Module
        ├── Remove Module
        ├── Password Change Module
        └── Settings Module
```

### State Management Flow

```
Redux Store
├── LoginSlice (user auth state)
├── Session Management
└── Persisted to localStorage (via redux-persist)
```

### API Communication

- **Axios** for all HTTP requests
- **JWT** tokens for authentication
- **Reverse proxy** via Nginx (`/api/` routes)
- **Error handling** with toast notifications

---

## 🔐 Role-Based Access Control

The application supports 4 user roles with specific access permissions:

### Roles

| Role | Access Denied Pages | Default Page |
|------|-------------------|--------------|
| `read_only` | `/Order`, `/Sales` | (none) |
| `ext_1` | `/Order`, `/Sales`, `/Report`, `/Document`, `/Inventory` | `/Dashboard` |
| `ext_2` | `/Order`, `/Sales`, `/Report`, `/Dashboard`, `/Inventory` | `/Document` |
| `super` | (no restrictions) | (none) |

### Session Management

- **Session Duration**: 5 hours
- **Auto-logout**: Configured in `config.json`
- **Persistent Login**: Redux state persisted to localStorage

---

## 📝 Key Scripts

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App (one-way operation)
```

---

## 🔧 Troubleshooting

### Backend Connection Issues
- Verify `host` in `public/config.json`
- Check `BACKEND_URL` environment variable in Docker
- Ensure backend service is running on port 8082

### Session Timeout
- Default session: 5 hours
- Modify `sessionExpiredTime` in `public/config.json`

### Image Upload Issues
- Max simultaneous uploads: 4 (set in `public/config.json`)
- Check file size limits in Nginx config

---

## 📄 License

© 2024 eCommerce Admin Panel - All Rights Reserved

---

## 👨‍💻 Developer Information

**Repository**: [eCommerce-adminPanel](https://github.com/sumit0166/eCommerce-adminPanel)  
**Owner**: sumit0166  
**Current Version**: 1.0.2  
**Last Updated**: December 2024
