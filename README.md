# Sheepfish-test-app web application

[See Demo Application on vercel](https://sheepfish-test.vercel.app/products)

This is a simple web application that allows users to **browse** and **filter** lists of products from a database. It is built using **React** and **Redux** for creating the interface and managing the application's state.

## Features
- **Basic layout**: In the application, a basic web layout is implemented, including header, a search bar, and the body of the pages
- **Multiple pages**: The app consists 2 pages to interact : products page and add new product page
- **Routing**: [React Router](https://reactrouter.com/en/main) is used to create routes within the app, allowing users to navigate between pages.
- **State management**: [Redux](https://redux.js.org/) is used to manage the state of the application. Reducers and actions are implemented to add, delete, and update products.
- **Product List component**: Displays data from the Redux store as a table with columns for ID, name, description, price, photo, rating, stock, and category. Users can click on a product row to view the product image.
- **Search functionality**: Users can search for products by name or category. The product list component automatically updates when users enter a query in the search bar.
- **Form for adding new products**: A form is provided for adding new products. [Formik](https://formik.org/) and [Yup](https://github.com/jquense/yup) are used for data validation. The form includes fields for title, brand, description, stock, and price.
- **Deletion of products**: Users can delete products from the list and from the Redux store.

## Technologies and Useful Links

- [Dummy JSON](https://dummyjson.com/): Used for generating mock data.
- [Formik](https://formik.org/): Used for handling form input and validation.
- [Yup](https://github.com/jquense/yup): Used for defining validation schemas.
- [React Router](https://reactrouter.com/en/main): Used for creating navigation routes.
- [Redux](https://redux.js.org/): Used for state management.
- [Redux Toolkit](https://redux-toolkit.js.org/): Enhances Redux development by providing simplified tools and abstractions.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



