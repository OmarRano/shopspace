# Sahad Stores - Startup Guide

## Overview

Sahad Stores is a comprehensive multi-role e-commerce platform built with the MERN-like stack (React, TypeScript, Express, MySQL via Drizzle ORM). It features role-based access control for 6 user types, automated commission calculations, payment processing via Monnify, and real-time order tracking.

---

## Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher)
- **pnpm** (package manager)
- **MySQL** database (local or remote)
- **Monnify Account** (for payment processing)

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd sahad-stores
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL=mysql://user:password@localhost:3306/sahad_stores
   JWT_SECRET=your-secret-key-here
   MONNIFY_API_KEY=your-monnify-api-key
   MONNIFY_SECRET_KEY=your-monnify-secret-key
   MONNIFY_BASE_URL=https://sandbox.monnify.com
   MONNIFY_ACCOUNT_NUMBER=your-account-number
   VITE_APP_ID=your-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
   ```

4. **Initialize the database:**
   ```bash
   pnpm db:push
   ```

---

## Start Commands

### Backend Server

**Development mode:**
```bash
pnpm dev
```

This command:
- Starts the Express server on `http://localhost:3000`
- Watches for file changes and auto-reloads
- Initializes Manus OAuth
- Connects to the MySQL database

**Production build:**
```bash
pnpm build
pnpm start
```

### Frontend Development

The frontend is served from the same Express server in development mode. When you run `pnpm dev`, both backend and frontend are running together:

- **Frontend URL:** `http://localhost:3000`
- **API endpoint:** `http://localhost:3000/api/trpc`
- **Hot Module Replacement (HMR):** Enabled for instant UI updates

### Running Tests

```bash
pnpm test
```

This runs all Vitest unit tests for:
- Commission calculation logic
- Authentication procedures
- Database operations

---

## Project Structure

```
sahad-stores/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components (organized by role)
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # tRPC client setup
│   │   ├── App.tsx           # Main router
│   │   └── main.tsx          # Entry point
│   └── public/               # Static assets
│
├── server/                    # Express backend
│   ├── routers.ts            # tRPC API endpoints
│   ├── db.ts                 # Database query helpers
│   ├── rbac.ts               # Role-based access control
│   ├── commission.ts         # Commission calculation logic
│   ├── monnify.ts            # Monnify payment integration
│   ├── payment-router.ts     # Payment API endpoints
│   └── _core/                # Core infrastructure
│
├── drizzle/                  # Database schema & migrations
│   └── schema.ts             # Table definitions
│
├── shared/                   # Shared constants & types
└── package.json              # Dependencies & scripts
```

---

## Key Features

### 1. **Role-Based Access Control (RBAC)**

Six user roles with distinct permissions:

- **Admin**: Full platform control, user management, analytics
- **Manager**: Product management, inventory tracking, category management
- **Delivery**: Order assignment, delivery tracking, status updates
- **Reader (Affiliate)**: Referral management, commission tracking, earnings dashboard
- **Developer**: Platform analytics, system configuration
- **Buyer**: Product browsing, shopping cart, checkout, order tracking

### 2. **Authentication**

- **Manus OAuth**: Primary authentication method
- **Email Signup**: New users can create accounts via email
- **Session Management**: Secure cookie-based sessions
- **Logout**: Clear session and redirect to home

### 3. **Payment Processing**

- **Monnify Integration**: Nigerian payment gateway
- **Payment Initiation**: Create payment sessions with order details
- **Payment Verification**: Verify payment status and update orders
- **Order Confirmation**: Automatic order status updates after payment

### 4. **Commission System**

- **Automated Calculation**: Transparent profit distribution
- **Multi-stakeholder Support**: Admin, manager, delivery, and affiliate commissions
- **Commission Ledger**: Track all commission transactions
- **Real-time Updates**: Instant commission calculation on order placement

### 5. **Product Management**

- **CRUD Operations**: Create, read, update, delete products
- **Category Management**: Organize products by categories
- **Stock Tracking**: Real-time inventory management
- **Featured Products**: Highlight bestselling items
- **Search & Filter**: Advanced product discovery

### 6. **Order Management**

- **Order Placement**: Seamless checkout flow
- **Status Tracking**: Pending → Processing → Shipped → Delivered
- **Order History**: View past orders and details
- **Order Cancellation**: Cancel orders before processing
- **Payment Tracking**: Link orders to payment transactions

---

## API Endpoints (tRPC)

All API endpoints are accessed via `/api/trpc`:

### Authentication
- `auth.me` - Get current user
- `auth.logout` - Clear session
- `auth.signup` - Create new account

### Products
- `products.list` - Get all products
- `products.featured` - Get featured products
- `products.byCategory` - Filter by category
- `products.search` - Search products
- `products.create` - Create product (manager only)
- `products.update` - Update product (manager only)
- `products.delete` - Delete product (manager only)

### Orders
- `orders.create` - Place new order
- `orders.list` - Get user's orders
- `orders.getById` - Get order details
- `orders.updateStatus` - Update order status (admin/manager only)
- `orders.cancel` - Cancel order

### Payment
- `payment.initiatePayment` - Start Monnify payment
- `payment.verifyPayment` - Check payment status
- `payment.getPaymentHistory` - View payment history

### Cart
- `cart.add` - Add item to cart
- `cart.remove` - Remove item from cart
- `cart.list` - Get cart items
- `cart.clear` - Empty cart

### Delivery
- `delivery.getAssignedOrders` - Get rider's orders
- `delivery.updateStatus` - Update delivery status
- `delivery.confirmDelivery` - Mark order as delivered

### Affiliate
- `affiliate.getReferralLink` - Generate referral link
- `affiliate.getEarnings` - View commission earnings
- `affiliate.getCommissionHistory` - View transaction history

### Admin
- `admin.getStats` - Platform statistics
- `admin.getUsers` - List all users
- `admin.updateUserRole` - Change user role
- `admin.getSalesAnalytics` - Revenue and sales data

---

## Database Schema

The application uses 14 tables:

1. **users** - User accounts and roles
2. **products** - Product catalog
3. **categories** - Product categories
4. **cartItems** - Shopping cart items
5. **orders** - Customer orders
6. **orderItems** - Items in each order
7. **deliveryTracking** - Delivery status and location
8. **commissionLedger** - Commission transactions
9. **wallets** - User wallet balances
10. **referralLinks** - Affiliate referral tracking
11. **inventoryLogs** - Stock adjustment history
12. **reviews** - Product reviews and ratings
13. **promotionalBanners** - Marketing banners
14. **inventoryAlerts** - Low-stock notifications

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql://user:pass@localhost:3306/db` |
| `JWT_SECRET` | Session signing secret | `your-secret-key` |
| `MONNIFY_API_KEY` | Monnify API key | `MK_TEST_UXKKD40KLR` |
| `MONNIFY_SECRET_KEY` | Monnify secret key | `H9JSUFZRUJQCBCQAZ5WA6C7PVGJLVCW9` |
| `MONNIFY_BASE_URL` | Monnify API base URL | `https://sandbox.monnify.com` |
| `MONNIFY_ACCOUNT_NUMBER` | Monnify wallet account | `1812893181` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_ID` | OAuth app ID | (from Manus) |
| `OAUTH_SERVER_URL` | OAuth server URL | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL | `https://oauth.manus.im` |

---

## Testing

### Run All Tests
```bash
pnpm test
```

### Run Specific Test File
```bash
pnpm test server/commission.test.ts
```

### Watch Mode
```bash
pnpm test --watch
```

### Test Coverage
```bash
pnpm test --coverage
```

---

## Development Workflow

1. **Start the dev server:**
   ```bash
   pnpm dev
   ```

2. **Make changes to:**
   - Frontend: `client/src/**`
   - Backend: `server/**`
   - Database schema: `drizzle/schema.ts`

3. **For database schema changes:**
   ```bash
   pnpm db:push
   ```

4. **Run tests before committing:**
   ```bash
   pnpm test
   ```

5. **Build for production:**
   ```bash
   pnpm build
   ```

---

## Deployment

### Build for Production

```bash
pnpm build
```

This creates:
- `dist/` - Compiled backend server
- `client/dist/` - Compiled frontend assets

### Start Production Server

```bash
NODE_ENV=production pnpm start
```

The server will run on the port specified in `process.env.PORT` (default: 3000).

---

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure MySQL server is running
- Check database credentials

### Monnify Payment Errors
- Verify API keys are correct
- Check Monnify account is active
- Ensure base URL matches your environment (sandbox/production)

### OAuth Login Issues
- Verify `VITE_APP_ID` is set
- Check OAuth server URL is accessible
- Clear browser cookies and try again

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 pnpm dev
```

---

## Support & Documentation

For more information:
- **tRPC Documentation**: https://trpc.io
- **Drizzle ORM**: https://orm.drizzle.team
- **React Documentation**: https://react.dev
- **Monnify API Docs**: https://monnify.com/api

---

## License

MIT License - See LICENSE file for details
