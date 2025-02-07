# DummyJSON CRUD Application

<img width="718" alt="Screenshot 2025-02-07 at 16 59 36" src="https://github.com/user-attachments/assets/649ab088-f3dc-447a-b339-08b7d76a1a9a" />

![Screenshot 2025-02-07 at 16 56 38](https://github.com/user-attachments/assets/8398e888-05ca-43ff-8090-0e3867325f1e)

<img width="1423" alt="Screenshot 2025-02-07 at 17 01 04" src="https://github.com/user-attachments/assets/7a1cb579-2ee8-4682-a11d-e473ddd03781" />

<img width="1433" alt="Screenshot 2025-02-07 at 17 01 15" src="https://github.com/user-attachments/assets/4f793d38-cfe4-458b-966e-4300342bec4e" />

<img width="1433" alt="Screenshot 2025-02-07 at 17 01 57" src="https://github.com/user-attachments/assets/a94612e7-733e-4975-b8f1-65aae9b18e5e" />


## Overview
This repository contains a **Next.js** application that I built using the [DummyJSON API](https://dummyjson.com/docs/products). It addresses several topics including **state management**, **server-side rendering (SSR)**, **client-side rendering (CSR)**, and the use of **React hooks**.

The application provides an intuitive user interface from the DummyJSON API for interacting with products. I implemented features allowing users to **view, add, update, and delete products**, leveraging dynamic data fetching and state management techniques.

---

## Features
- **Read**: Fetched and displayed a list of products.
- **Create**: Implemented a form to add a new product.
- **Update**: Designed a pre-filled form allowing users to modify product details.
- **Delete**: Enabled product deletion from the list.
- **Hybrid Rendering**:
  - Used **SSR** (Server-Side Rendering) for initial page load.
  - Leveraged **CSR** (Client-Side Rendering) for interactions like adding, updating, and deleting.
- **State Management**:
  - Used **Zustand** for client-side state persistence.
  - Integrated **TanStack Query** (react-query) for efficient API state synchronization.
- **Error Handling**:
  - Implemented user-friendly error messages for API failures.
  - Addressed issues arising from DummyJSON API limitations.
- **Optimized Hydration Strategy**:
  - Built a **custom Zustand hydration provider** to prevent flickering issues.
  - Ensured smooth state rehydration during page transitions.

---

## Workaround for State Management Issues
### Problem with DummyJSON API
When I began working on this project, I encountered a limitation: the **DummyJSON API does not persist new products**. Any product created via the API doesn't save on the server, but user get a simulated response, making traditional CRUD functionality unreliable.

### Solution
To resolve this, I implemented a **hybrid state management approach**:

1. **Zustand for Local State Persistence**:
   - I used Zustand for **client-side state management**, ensuring local modifications persist across page reloads.
   - I added a **local storage mechanism** via `zustand/middleware` to store data between sessions.
   - I implemented **auto-incremented product IDs** to assign unique identifiers and prevent conflicts.

2. **TanStack Query (React Query) for API Syncing**:
   - Prefetched API data to ensure SSR-rendered products were available before hydration.
   - Used **mutations for create, update, and delete** to manage API interactions while keeping the UI responsive.
   - **Skipped API interactions** for local-only products (IDs above `1000`) to avoid unnecessary network calls.

### Implementation Details
- **Product Creation**: New products were stored **only in Zustand**, bypassing the DummyJSON API’s limitations.
- **Product Updates**: Updated Zustand’s state first, then synced with the API where applicable.
- **Product Deletion**: Deleted products from the API when possible; otherwise, I removed them from Zustand.
- **SSR Handling**:
  - **Server-side fetching** retrieved persisted products.
  - If a product ID exceeded `1000`, hydration relied solely on Zustand instead of the API.

---

## Technical Stack
| Technology | Purpose |
|------------|---------|
| **Next.js** | Framework for React applications |
| **Zustand** | State management for local product storage |
| **TanStack Query** | API data fetching, caching, and background updates |
| **React Hook Form** | Form handling and validation |
| **Tailwind CSS** | Styling framework |
| **Sonner** | Notification system for user feedback |
| **Radix UI** | Accessible UI components |
| **Axios** | API requests handling |

---

## Application Structure
```sh
src/
├── app/
│   ├── product/
│   │   ├── [id]/page.tsx
│   │   ├── create/page.tsx
│   │   ├── edit/[id]/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── forms/
│   │   ├── AddProductForm.tsx
│   │   ├── EditProductForm.tsx
│   │   ├── ProductFormField.tsx
│   ├── products/
│   │   ├── ui/
│   │   │   ├── HydratedProductList.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetails.tsx
│   │   ├── zustand/
│   │   │   ├── PersistProductDetails.tsx
│   │   │   ├── PersistProducts.tsx
│   ├── Navbar.tsx
│   ├── OptimizedImage.tsx
├── hooks/
│   ├── useAddProduct.ts
│   ├── useDeleteProduct.ts
│   ├── useEditProduct.ts
├── lib/
│   ├── providers/
│   │   ├── Hydrate.tsx
│   │   ├── TanstackProvider.tsx
│   │   ├── ZustandProvider.tsx
│   ├── api.ts
│   ├── reactQuery.ts
│   ├── utils.ts
├── state/
│   ├── useProductStore.ts
├── types/
│   ├── interface/
│   │   ├── product.ts
```


## Live Demo 🌐
You can access the live version of the application here:  
🔗 **[DummyJSON CRUD App](https://dummyjson-crud.vercel.app/)**

---

## Prerequisites
Before proceeding with the installation, ensure you have the following dependencies installed:
- **Node.js** (>=18.0.0)
- **Yarn** (recommended) or **npm**
- **Git** (optional, for cloning the repository)

---

## **1. Clone the Repository**
To get started, clone the repository using Git:
git clone https://github.com/Oreanu/dummyjson-crud.git
cd dummyjson-crud


## License
This project is licensed under the **MIT License**.

---

## Contact
For any queries, reach out at [olayemioreanu@gmail.com](mailto:olayemioreanu@gmail.com)

