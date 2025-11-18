import { Link } from "react-router-dom";

export default function Login({setOption, setActiveForm, formData}) {
  return (
      <div className="px-6 flex">
        <div className="bg-white my-6 rounded-lg p-6">
          <form type="submit">
            <label htmlFor="userId">User ID</label>
            <br />
            <input
              type="text"
              placeholder="user name"
              value={formData.username}
              className="border border-gray-200 w-full rounded-lg p-2 my-2"
              required
            />

            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              className="border border-gray-200 w-full rounded-lg p-2 my-2"
              required
            />
            <br />
            <Link
              to={"/home"}
              className="bg-[#34C94B] px-4 py-2 my-3 rounded-lg text-white font-semibold"
              onClick={() => setOption(true)}
            >
              Login
            </Link>
          </form>
          <br />
          <div className="flex gap-1">
            <p>Not a member yet</p>
          <button
          type="button"
          onClick={()=>setActiveForm('register')}>Register now</button>
          </div>
        </div>
      </div>
  );
}
