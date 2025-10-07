export default function Login() {
  return (
    <section className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800">Login</button>
      </form>
    </section>
  );
}
