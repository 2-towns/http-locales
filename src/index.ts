import path from "path"
import { readFile, readdir } from "fs/promises"
import { AsyncLocalStorage } from "async_hooks"

const translations = new Map<string, Map<string, string>>()

export const HttpLocalesContext = new AsyncLocalStorage<string>()

export function __(key: string, ...replacements: unknown[]) {
	const lang = HttpLocalesContext.getStore() || "en"
	let message = translations.get(lang)?.get(key) || key
	for (const replacement of replacements) {
		message = message.replace("%s", `${replacement}`)
	}
	return message
}

export const HttpLocales = {
	async load() {
		const promises: Promise<[string, Buffer]>[] = []
		const folder = path.join(process.cwd(), process.env.HTTP_LOCALES_FOLDER || "locales")
		const files = await readdir(folder)

		for (const file of files) {
			const lang = file.replace(".json", "")
			promises.push(readFile(path.join(folder, file)).then(buf => [lang, buf]))
		}

		for (const [lang, buf] of await Promise.all(promises)) {
			const json = JSON.parse(buf.toString())
			translations.set(lang, new Map(Object.entries(json)))
		}
	},
}

