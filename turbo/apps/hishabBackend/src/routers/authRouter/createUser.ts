export function createUser(email: string, name: string, password: string) {
  console.log(email);
  console.log(name);
  console.log(password);
  return {
    email,
    name,
    password,
  };
}
