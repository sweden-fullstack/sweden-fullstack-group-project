// controllers/user.controller.ts
import { Request, Response } from "express"
import typia from "typia"
import userService from "./user.service"
import UserCreate from "@/shared/types/user/user.create"
import UserUpdate from "@/shared/types/user/user.update"

// Too lazy to write template for errors, just create custom error class and catch it by it's unique message or status code
class UserController {
	async getAll(_req: Request, res: Response) {
		try {
			const users = await userService.getAllUsers()
			res.json(users)
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}

	async getByUsername(req: Request, res: Response) {
		try {
			const username = req.params.username as string

			const user = await userService.getUserByUsername(username)
			res.json(user)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: "Internal server error" })
		}
	}

	async create(req: Request, res: Response) {
		try {
			// Validate and cast request body using Typia
			const body = typia.misc.assertPrune<UserCreate>(req.body)
			const newUser = await userService.createUser(body)

			res.status(201).json(newUser)
		} catch (error) {
			console.error(error)
			res.status(400).json({ error: "Internal server error" })
		}
	}

	async update(req: Request, res: Response) {
		try {
			const username = req.params.username as string
			const body = typia.misc.assertPrune<UserUpdate>(req.body)

			const newUser = await userService.updateUser(username, body)
			return res.status(200).json(newUser)
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: "Internal server error" })
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const username = req.params.username as string

			await userService.deleteUser(username)
			return res.status(204).send()
		} catch (error) {
			console.error(error)
			return res.status(500).json({ error: "Internal server error" })
		}
	}
}

export default new UserController()
