# Pipeline Builder – React + FastAPI

A visual pipeline builder built with **React (frontend)** and **FastAPI (backend)**.  
---

## 🚀 Features

### 1. **Node Abstraction**
- Created a reusable **BaseNode** component to avoid repetitive code for multiple node types.
- Easily create new nodes by passing configuration instead of duplicating code.
- Added 5+ new example nodes to demonstrate flexibility.

### 2. **Dynamic Styling**
- Styled the entire application with a clean, modern UI.
- Unified design system across all node types and UI components.
- Responsive and user-friendly layout.

### 3. **Text Node Logic Enhancements**
- Auto-resizes node width/height as text grows.
- Supports **variable placeholders** using `{{ variableName }}`.
- Automatically generates a connection handle for each variable found.

### 4. **Backend Integration**
- Sends pipeline data (nodes + edges) to the backend `/pipelines/parse` endpoint.
- Backend processes:
  - Counts nodes and edges.
  - Checks if the graph is a **Directed Acyclic Graph (DAG)**.
- Displays results in a user-friendly alert.

---

## 🛠️ Tech Stack

### **Frontend**
- React
- JavaScript
- React Flow (for graph UI)
- CSS

### **Backend**
- Python
- FastAPI
- Uvicorn

---

## 📂 Project Structure

pipeline builder/
│── frontend/ # React frontend
│── backend/ # FastAPI backend
│── README.md


---

## ⚡ Getting Started

### 1. **Clone the repository**
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd pipeline builder

### ** Setup Frontend **
cd frontend
npm install
npm start

### ** Setup Backend **
cd backend
source ./venv/bin/activate
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
