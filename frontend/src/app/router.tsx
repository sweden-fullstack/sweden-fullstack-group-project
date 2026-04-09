import { createBrowserRouter, RouterProvider } from "react-router-dom"

const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "*",
			lazy: () => import("@/features/not-found"),
		},
		{
			path: "/",
			lazy: () => import("@/features/welcome"),
		},
	])

export default function AppRouter() {
	return <RouterProvider router={createAppRouter()} />
}
