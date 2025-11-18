

export default function Register({setActiveForm,handleChange, handleFormSubmit}) {

  return (
    <div className="bg-white w-full my-6 rounded-lg p-6">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="userId">User ID</label>
          <br />
          <input
            type="text"
            name='username'
            placeholder="user name"
            className="border border-gray-200 w-full rounded-lg p-2 my-2"
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            placeholder="name"
            name='name'
            onChange={handleChange}
            className="border border-gray-200 w-full rounded-lg p-2 my-2"
            required
          />
          <label htmlFor="name">Email</label>
          <br />
          <input
            type="email"
            placeholder="email"
            name='email'
            onChange={handleChange}
            className="border border-gray-200 w-full rounded-lg p-2 my-2"
            required
          />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            placeholder="password"
            name='password'
            onChange={handleChange}
            className="border border-gray-200 w-full rounded-lg p-2 my-2"
            required
          />
          <br />
          <label htmlFor="confirm password">Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="confirm password"
            name='confirmpassword'
            onChange={handleChange}
            className="border border-gray-200 w-full rounded-lg p-2 my-2"
            required
          />
          <button
            type="submit"
            className="bg-[#34C94B] px-4 py-2 my-3 rounded-lg text-white font-semibold"
          >
            Register
          </button>
        </form>
        <div className="flex gap-1">
          <p>already a member</p> <button
          type="button"
          onClick={()=>setActiveForm('login')}>Login now</button>
        </div>
      </div>
  );
}
