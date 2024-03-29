import { before, describe, it } from "node:test";
import { HttpLocales, HttpLocalesContext, __ } from ".";
import assert from "node:assert";

describe("http locales", () => {
	before(async () => {
		await HttpLocales.load()
	})

	it("returns the text translated", () => {
		HttpLocalesContext.run("en", () => {
			assert.strictEqual(__("hello"), "hello world !")
			assert.strictEqual(__("with interpolation %s", "arnaud"), "with interpolation arnaud")
		})
	})
})
