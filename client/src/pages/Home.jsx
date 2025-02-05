import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
function Home() {
  const state = useSelector((state) => state);
  function foo() {
    console.log("foo:", state);
  }
  return (
    <div>
      Home
      <Button onClick={foo}>Click me</Button>
      {state.user.isLoggedIn && <div>Logged in</div>}
    </div>
  );
}

export default Home;
