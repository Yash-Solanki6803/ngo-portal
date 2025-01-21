import { useSelector } from "react-redux";
function Home() {
  const user = useSelector((state) => state.user);
  function foo() {
    console.log("foo:", user);
  }
  return (
    <div>
      Home
      <button
        className="bg-gray-600 px-4 py-2 rounded-md m-10 text-white"
        onClick={foo}
      >
        Check state
      </button>
      {user.isLoggedIn && <div>Logged in</div>}
    </div>
  );
}

export default Home;
