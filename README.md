# React Admin Dashboard

A modern, responsive React-based admin dashboard frontend for managing an e-commerce platform. Built with TypeScript, Redux for state management, and React Router for navigation. This frontend provides a comprehensive interface for user management, role-based access control, product management, order processing, and analytics visualization. The codebase follows (and extends) lessons from the course [React and Golang: A Practical Guide](https://www.udemy.com/course/react-go-admin/). 


**Backend Repository:** [go-admin](https://github.com/YimingCao-Eric/go-admin)

## 🚀 Features

### Authentication & User Management
- **User Authentication**: Login and registration pages with JWT-based authentication
- **User Management**: Complete CRUD operations for user accounts
  - View paginated user list
  - Create new users with role assignment
  - Edit user information and roles
  - Delete users with confirmation
- **Profile Management**: Users can update their own profile information and change passwords

### Role-Based Access Control 
- **Role Management**: Full CRUD interface for roles
  - View all roles
  - Create roles with permission assignments
  - Edit roles and their associated permissions
  - Delete roles
- **Permission Management**: Visual interface for assigning permissions to roles

### Product Management
- **Product Catalog**: Complete product management system
  - Paginated product listing with images
  - Create new products with image upload
  - Edit existing products
  - Delete products with confirmation
- **Image Upload**: Integrated image upload component for product images

### Order Management
- **Order Tracking**: View all orders with detailed information
  - Paginated order list
  - Expandable order items view
  - Customer information display
  - Order totals and pricing
- **Data Export**: Export orders to CSV format

### Analytics & Dashboard
- **Sales Dashboard**: Visual representation of daily sales data
- **Interactive Charts**: Bar charts using C3.js library for sales visualization
- **Real-time Data**: Fetches and displays up-to-date sales analytics

### UI/UX Features
- **Responsive Design**: Mobile-friendly layout using Bootstrap
- **Protected Routes**: Authentication wrapper for secure pages
- **Loading States**: User feedback during data fetching
- **Error Handling**: Graceful error handling and user notifications
- **Navigation**: Sidebar menu with active route highlighting
- **Pagination**: Efficient data pagination for large datasets

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (version 14.0 or higher)
- **npm** (version 6.0 or higher) or **yarn**
- **Backend API** running (see [go-admin](https://github.com/YimingCao-Eric/go-admin) for backend setup)
- **Git** (for cloning the repository)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure API endpoint**
   
   The API base URL is configured in `src/index.tsx`. By default, it's set to:
   ```typescript
   axios.defaults.baseURL = 'http://localhost:8000/api/';
   ```
   
   Update this if your backend is running on a different URL or port.

4. **Start the backend server**
   
   Make sure the backend API is running. See the [backend repository](https://github.com/YimingCao-Eric/go-admin) for setup instructions.

## 🏃 Running the Application

1. **Start the backend server first**
   
   Make sure the backend API is running. See the [go-admin repository](https://github.com/YimingCao-Eric/go-admin) for backend setup instructions.
   
   The backend should be running at `http://localhost:8000`

2. **Start the frontend development server**
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

3. **Open your browser**
   
   The application will automatically open at [http://localhost:3000](http://localhost:3000)

4. **Login**
   
   - If you don't have an account, register at `/register`
   - Login with your credentials at `/login`
   - After successful login, you'll be redirected to the dashboard

## 📁 Project Structure

```
react-admin/
├── public/                 # Static assets
│   ├── index.html         # HTML template
│   └── ...
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ImageUpload.tsx    # Image upload component
│   │   ├── Menu.tsx          # Sidebar navigation menu
│   │   ├── Nav.tsx           # Top navigation bar
│   │   ├── Paginator.tsx     # Pagination controls
│   │   └── Wrapper.tsx        # Layout wrapper with auth check
│   ├── models/            # TypeScript data models
│   │   ├── order-item.ts
│   │   ├── order.ts
│   │   ├── permission.ts
│   │   ├── product.ts
│   │   ├── role.ts
│   │   └── user.ts
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx      # Main dashboard with charts
│   │   ├── Login.tsx          # Login page
│   │   ├── Register.tsx       # Registration page
│   │   ├── orders/
│   │   │   └── Orders.tsx     # Order management page
│   │   ├── products/
│   │   │   ├── Products.tsx       # Product listing
│   │   │   ├── ProductCreate.tsx  # Create product form
│   │   │   └── ProductEdit.tsx    # Edit product form
│   │   ├── roles/
│   │   │   ├── Roles.tsx          # Role listing
│   │   │   ├── RoleCreate.tsx     # Create role form
│   │   │   └── RoleEdit.tsx       # Edit role form
│   │   └── users/
│   │       ├── Users.tsx          # User listing
│   │       ├── UserCreate.tsx     # Create user form
│   │       ├── UserEdit.tsx       # Edit user form
│   │       └── Profile.tsx        # User profile page
│   ├── redux/              # Redux state management
│   │   ├── actions/
│   │   │   └── setUserAction.ts   # User action creator
│   │   ├── reducers/
│   │   │   └── setUserReducer.ts  # User reducer
│   │   └── configureStore.ts     # Redux store configuration
│   ├── App.tsx             # Main app component with routing
│   ├── index.tsx           # Application entry point
│   └── ...
└── package.json            # Dependencies and scripts
```

## 🔌 API Integration

The frontend communicates with the backend API at `http://localhost:8000/api/`. For complete API documentation, see the [go-admin README](https://github.com/YimingCao-Eric/go-admin).

### Authentication
- **Login**: `POST /api/login` - Authenticates user and receives JWT token in HTTP-only cookie
- **Register**: `POST /api/register` - Creates new user account
- **Logout**: `POST /api/logout` - Clears authentication cookie
- **Get User**: `GET /api/user` - Fetches current authenticated user

### Data Fetching
- All API requests use `axios` with credentials enabled for cookie-based authentication
- Pagination is handled via query parameters: `?page=1` (default: 5 records per page)
- Error handling is implemented for failed requests
- Response format follows backend pagination structure:
  ```json
  {
    "data": [...],
    "meta": {
      "total": 100,
      "page": 1,
      "last_page": 20
    }
  }
  ```

### State Management
- **Redux**: Used for managing authenticated user state globally
- User information is stored in Redux store and accessible throughout the app

## 🛠️ Technologies Used

- **React 19**: Modern UI library
- **TypeScript**: Type-safe JavaScript for better development experience
- **Redux**: Global state management for user authentication
- **React Router v7**: Client-side routing and navigation
- **Axios**: HTTP client for API requests with cookie support
- **C3.js / D3.js**: Charting libraries for data visualization
- **Bootstrap**: CSS framework for responsive styling
- **Create React App**: Build tooling and development environment

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the [running tests](https://facebook.github.io/create-react-app/docs/running-tests) section for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 🔐 Authentication Flow

1. **Login/Register**: User authenticates via login or registration form
   - Login: `POST /api/login` with email and password
   - Register: `POST /api/register` with user details and password confirmation
2. **Token Storage**: JWT token is stored in HTTP-only cookie by the backend (24-hour expiration)
3. **Protected Routes**: `Wrapper` component checks authentication on mount
   - Fetches current user via `GET /api/user`
   - Updates Redux store with user information
4. **Auto-redirect**: Unauthenticated users are redirected to login page
5. **State Management**: Authenticated user data is stored in Redux store
6. **Logout**: `POST /api/logout` clears authentication cookie and redirects to login

## 🎨 Key Components

### Wrapper Component
- Provides layout structure (Nav + Menu + Content)
- Handles authentication checking
- Redirects to login if unauthorized
- Shows loading state during auth check

### ImageUpload Component
- Handles file selection and upload
- Integrates with backend upload endpoint
- Updates form fields with uploaded image URL

### Paginator Component
- Provides Previous/Next navigation
- Prevents navigation beyond first/last page
- Used across list pages (Users, Products, Orders)

## 🔄 Backend Integration

This frontend is designed to work seamlessly with the [go-admin](https://github.com/YimingCao-Eric/go-admin) backend:

- **CORS**: Backend configured to accept requests from `http://localhost:3000`
- **Cookies**: JWT tokens transmitted via HTTP-only cookies (24-hour expiration)
- **API Endpoints**: All endpoints match backend route definitions
- **Error Handling**: Frontend handles backend error responses gracefully
- **Authentication**: JWT-based authentication with automatic token validation
- **Authorization**: Role-based access control (RBAC) enforced by backend

## 📝 Development Notes

- **TypeScript**: All components are written in TypeScript for type safety
- **Comments**: Codebase includes comprehensive JSDoc-style comments
- **Error Handling**: Try-catch blocks and error states implemented throughout
- **Loading States**: Loading indicators shown during async operations
- **Form Validation**: HTML5 validation and custom validation where needed
- **Code Style**: Follows React and TypeScript best practices
- **State Management**: Redux used for global user state, local state for component-specific data

## 🚀 Deployment

### Build for Production

To build the app for production:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Production Deployment Steps

1. **Update API Configuration**
   - Update the API base URL in `src/index.tsx` to point to your production backend
   - Ensure the backend CORS is configured to accept requests from your frontend domain

2. **Build the Application**
   ```bash
   npm run build
   ```

3. **Deploy the Build Folder**
   - Deploy the `build` folder to your hosting service (Netlify, Vercel, AWS S3, etc.)
   - Configure your hosting service to serve the React app correctly

4. **Backend Requirements**
   - Ensure the backend API is deployed and accessible
   - Update backend CORS settings to include your production frontend URL
   - Configure HTTPS for both frontend and backend in production

### Testing Production Build Locally

You can test the production build locally:

```bash
# Using serve
npx serve -s build

# Or using Node.js
npm install -g serve
serve -s build
```

## 📄 License

This project is part of an e-commerce admin system.

## 🤝 Contributing

This project follows best practices for React and TypeScript development. When contributing:

1. Follow the existing code style and comment conventions
2. Ensure TypeScript types are properly defined
3. Test your changes thoroughly
4. Update documentation as needed

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Redux Documentation](https://redux.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

---

**Note**: This is the frontend application. For the backend API service, visit the [go-admin repository](https://github.com/YimingCao-Eric/go-admin).
