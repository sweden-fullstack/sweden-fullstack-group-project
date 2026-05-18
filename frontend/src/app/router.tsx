import { createBrowserRouter, RouterProvider } from "react-router-dom"

const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "/",
			lazy: () => import("@/features/dashboard"),
		},
		{
			path: "/announcements",
			lazy: () => import("@/features/announcements"),
		},
		{
			path: "/cleaning",
			lazy: () => import("@/features/cleaning"),
		},
		{
			path: "/rules",
			lazy: () => import("@/features/rules"),
		},
		{
			path: "/section",
			lazy: () => import("@/features/section"),
		},
		{
			path: "/profile",
			lazy: () => import("@/features/profile"),
		},
		{
			path: "/login",
			lazy: () => import("@/features/login"),
		},
		{
			path: "*",
			lazy: () => import("@/features/not-found"),
		},
	])

export default function AppRouter() {
	return <RouterProvider router={createAppRouter()} />
}
