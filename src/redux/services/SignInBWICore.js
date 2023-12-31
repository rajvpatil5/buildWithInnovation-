export const signInAuthUserWithEmailandPassword = async (username, password) => {
  if (!username || !password) return;

  const response = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());

  //   console.log(response);
  return response;
};
