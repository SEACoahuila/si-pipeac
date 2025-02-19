import { Login } from "../components/login";
console.log("login page");
console.log(process.env.BASE_API)
export default function LoginPage() {
  return (
    <div>
     
      <Login />
    </div>
  );
}