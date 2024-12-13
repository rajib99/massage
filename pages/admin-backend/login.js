import React, { useState } from 'react';
import axios from 'axios';
import Router from "next/router";
import{ CURRENT_URL } from '../../components/config';
import loginCss from '../../components/admin/login.module.css'

const Login = (location) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tsm.spagram.com/api/admin-backend/login.php', { email, password });
      console.log(response.data.ok);
      if (!response.data.ok) {
            throw new Error("Login failed");
        }

        const { token } = response.data;
        localStorage.setItem("token", token);
        let admin_backend_url = CURRENT_URL + 'admin-backend';
        Router.push(admin_backend_url);
        // window.location.href = location.state ? location.state.from.pathname : '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={loginCss.form} onSubmit={handleSubmit}>
      <input
       className={loginCss.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={loginCss.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={loginCss.button} type="submit">Login</button>
    </form>
  );
};

export default Login;






// import React, { useState, useEffect } from "react";
// import Router from "next/router";
// import axios from 'axios';

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//         axios.post('https://tsm.spagram.com/api/admin-backend/login.php', {
//             firstName: 'Fred',
//             lastName: 'Flintstone'
//           })
//           .then(function (response) {
//             console.log(response);
//             console.log('ok', response.ok)
//             if (!response.ok) {
//                 throw new Error("Login failed");
//             }

//             const { token } = response;
//             localStorage.setItem("token", token);
//             Router.push("/");
//           })
//           .catch(function (error) {
//             console.log(error);
//           });




// //     try {
// //       const response = await fetch("https://tsm.spagram.com/api/admin-backend/login.php", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ username, password }),
// //       });

// //       console.log('ok', response.ok)
// //       if (!response.ok) {
// //         throw new Error("Login failed");
// //       }

// //       const { token } = await response.json();
// //       localStorage.setItem("token", token);
// //       Router.push("/");
// //     } catch (error) {
// //       setError(error.message);
// //     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {error && <div>{error}</div>}
//       <div>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           value={username}
//           onChange={(event) => setUsername(event.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(event) => setPassword(event.target.value)}
//         />
//       </div>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
