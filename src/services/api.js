// // import axios from 'axios';

// // const getBaseURL = () => {
// //   if (import.meta.env.PROD) {
// //     return 'https://final-hackathon-backend-red.vercel.app/api';
// //   }
// //   return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// // };

// // const API = axios.create({
// //   baseURL: getBaseURL(),
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// //   withCredentials: true,
// // });

// // API.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // API.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       localStorage.removeItem('token');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default API;










// import axios from 'axios';

// // const getBaseURL = () => {
// //   if (import.meta.env.PROD) {
// //     return 'https://final-hackathon-backend-red.vercel.app/api';
// //   }
// //   return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// // };



// const getBaseURL = () => {
//   if (import.meta.env.PROD) {
//     return 'https://final-hackathon-backend-red.vercel.app/api';
//   }
//   return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// };

// const API = axios.create({
//   baseURL: getBaseURL(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Don't hijack 401s coming from the login/signup calls themselves —
//     // those are just "wrong credentials" and must reach the component's
//     // own catch block (and its Swal error message) instead of reloading
//     // the page. Only force a redirect when a REAL session (existing token)
//     // turns out to be invalid/expired on some other authenticated request.
//     const url = error.config?.url || '';
//     const isAuthAttempt = url.includes('/auth/login') || url.includes('/auth/signup');

//     if (error.response?.status === 401 && !isAuthAttempt) {
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;
















import axios from 'axios';

const getBaseURL = () => {
  // Production (Vercel)
  if (import.meta.env.PROD) {
    return 'https://final-hackathon-backend-chi.vercel.app/api';
  }
  // Local development
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't redirect on login/signup failures
    const url = error.config?.url || '';
    const isAuthAttempt = url.includes('/auth/login') || url.includes('/auth/signup');

    if (error.response?.status === 401 && !isAuthAttempt) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;