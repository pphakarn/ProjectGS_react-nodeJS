# 📌 System Architecture Documentation

โครงสร้างระบบเว็บไซต์ E-Commerce บน AWS + Kubernetes (EKS)

---

## 🧩 ภาพรวมสถาปัตยกรรมระบบ (System Overview)

ระบบนี้เป็น **Cloud-Native Web Application Architecture** ที่ออกแบบโดยใช้ **Microservices + Container + Kubernetes + AWS Managed Services** เพื่อให้ระบบมีความสามารถในการ:

* รองรับผู้ใช้งานจำนวนมาก (Scalable)
* มีความเสถียรสูง (High Availability)
* บริหารจัดการง่าย (Maintainable)
* รองรับ CI/CD (Continuous Deployment)

---

## 🏗 โครงสร้างภาพรวม (High-Level Architecture)

```text
User
  ↓
AWS Application Load Balancer (ALB)
  ↓
Kubernetes Service (LoadBalancer)
  ↓
Kubernetes Cluster (EKS)
   ├── Frontend Pod (React + Nginx)
   └── Backend Pod (Node.js API)
            ↓
        Amazon RDS (MySQL)
```

---

## 🧱 องค์ประกอบหลักของระบบ (System Components)

### 1️⃣ Frontend Layer

**Technology Stack**

* React.js
* Nginx
* Docker Container
* Kubernetes Deployment

**หน้าที่:**

* แสดงผล UI ให้ผู้ใช้
* เรียกใช้งาน API จาก Backend
* ทำหน้าที่เป็น Client Application

**Flow:**

```text
Browser → ALB → Frontend Pod → Backend API
```

---

### 2️⃣ Backend Layer

**Technology Stack**

* Node.js (Express)
* Prisma ORM
* Docker Container
* Kubernetes Deployment

**หน้าที่:**

* ให้บริการ REST API
* ประมวลผล Business Logic
* ติดต่อฐานข้อมูล

**ตัวอย่าง API Endpoint**

```text
/api/login
/api/products
/api/cart
/api/order
```

---

### 3️⃣ Database Layer

**Technology Stack**

* Amazon RDS (MySQL)

**หน้าที่:**

* เก็บข้อมูลระบบ เช่น:

  * User
  * Product
  * Order
  * Cart

**Connection Flow:**

```text
Backend Pod → AWS RDS MySQL
```

---

### 4️⃣ Container Registry

**Technology:**

* AWS ECR (Elastic Container Registry)

**หน้าที่:**

* เก็บ Docker Image ของ Frontend & Backend

```text
Docker Build → Push Image → ECR → Kubernetes Pull
```

---

### 5️⃣ Kubernetes Cluster (EKS)

**Technology:**

* Amazon EKS

**หน้าที่:**

* Orchestration Containers
* Auto Scaling
* High Availability
* Rolling Update

---

## 🚦 Data Flow Diagram

```text
User
  ↓
ALB (Public Internet)
  ↓
Frontend Service
  ↓
Frontend Pod (React)
  ↓ API Call
Backend Service
  ↓
Backend Pod (Node.js)
  ↓
Amazon RDS (MySQL)
```

---

## 🔁 CI/CD Pipeline Workflow

```text
GitHub Push
   ↓
GitHub Actions
   ↓
Docker Build
   ↓
Push Image → AWS ECR
   ↓
Deploy → Amazon EKS
   ↓
Rolling Update Pod
```

**ประโยชน์:**

* Deploy อัตโนมัติ
* ลด Downtime
* ปลอดภัย

---

## 🛡 Security Design

* ใช้ IAM Role สำหรับ Kubernetes Pod
* Database ใช้ Security Group จำกัด IP
* ไม่มีการเปิด Public Database
* Secret Management ผ่าน Kubernetes Secrets

---

## ⚙ Performance & Scalability

* Horizontal Pod Autoscaler (HPA)
* Kubernetes Auto Healing
* Load Balancer กระจายโหลด

---

## 🧪 Testing Strategy

* Load Testing: k6
* API Testing: Postman
* Stress Testing

---

## 🗃 System Folder Structure

```text
ProjectGS
 ├── backend
 │    ├── controllers
 │    ├── routes
 │    ├── prisma
 │    └── server.js
 │
 ├── frontend
 │    ├── src
 │    ├── public
 │    └── nginx.conf
 │
 ├── k8s
 │    ├── frontend-deployment.yaml
 │    ├── backend-deployment.yaml
 │    └── service.yaml
 │
 └── .github/workflows
```

---

## 🎯 Architectural Design Pattern

* Microservices Architecture
* Container-Based Architecture
* Cloud Native Architecture

---

## 🚀 จุดเด่นของระบบ

* รองรับผู้ใช้จำนวนมาก
* ระบบเสถียร
* Deploy อัตโนมัติ
* รองรับ Cloud จริง

---

## 📈 Future Improvement

* CI/CD แบบเต็มรูปแบบ
* Observability (Prometheus + Grafana)
* Centralized Logging (ELK Stack)
* CDN (CloudFront)

---

## 👨‍💻 ผู้พัฒนา

**Pu Miniman**
Bachelor of Information Technology
Cloud Native & Full Stack Developer

---

> เอกสารนี้จัดทำเพื่อใช้ในการนำเสนอระบบ, ส่งงานวิชา Cloud Computing และเป็น Portfolio Project
