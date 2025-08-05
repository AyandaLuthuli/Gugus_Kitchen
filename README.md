# 🍔 Gugu's Kitchen Digital Ordering System

A full-stack web-based food ordering system built for **Gugu’s Kitchen**, a small fast-food container in East London. This system allows admins, cashiers, and customers to manage and place orders efficiently with real-time updates and automated inventory tracking.

## 🚀 Live Demo : Coming soon…


#woking on 

## ⚙️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Supabase (Auth, Realtime, RESTful API)
- **Database:** SQL (via Supabase)
- **Authentication:** Supabase Auth (Role-based access control)


## 🧩 Features

### ✅ Admin
- Manage users (add/edit/delete)
- Manage menu items
- View and generate sales reports
- Track and update inventory
- View low-stock alerts

### ✅ Cashier
- Take and process orders
- Record payment method (cash/card)
- Update order statuses (pending → completed)

### ✅ Customer (Optional Login)
- View menu
- Place orders (if public-facing)
- Earn and redeem loyalty points
- Provide feedback

### ✅ Kitchen Display
- Real-time order updates for food preparation


## 📦 Database Schema (Supabase)

Key tables:

- `users`: Stores all user accounts (admins, cashiers, customers)
- `admin`: Extended admin info
- `cashier`: Extended cashier info (shifts, IDs)
- `customer`: Loyalty points tracking
- `menu_items`: Menu of food and beverages
- `orders`: Tracks all customer orders
- `order_details`: Line items for each order
- `inventory`: Ingredient stock tracking
- `menuitem_inventory`: Maps recipes to ingredients
