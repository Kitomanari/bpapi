import * as centra from "centra";
import { Api, EndpointPath } from "./consts";
import { Intents, RawIntents } from "./enums";
import { HumanizeIntents } from "./utils";

export declare namespace Function {
	interface Info {
		/**
		 * The tag of the function
		 */
		tag: string;
		/**
		 * The description of the function
		 */
		description: string;
		/**
		 * The arguments of the function
		 */
		args: Argument[] | null;
		/**
		 * The intents of the function
		 */
		intents: Intents;
		/**
		 * Whether the function requires premium hosting time
		 */
		premium: boolean;
	}

	interface Response {
		/**
		 * The tag of the function
		 */
		tag: string;
		/**
		 * The description of the function
		 */
		shortDescription: string;
		/**
		 * The description of the function?
		 *
		 * *It was never used*
		 */
		longDescription: string;
		/**
		 * The arguments of the function
		 */
		arguments: Argument[] | null;
		/**
		 * The intents of the function
		 *
		 * 0 = None
		 *
		 * 2 = Members
		 *
		 * 256 = Presence
		 */
		intents: RawIntents;
		/**
		 * Whether the function requires premium hosting time
		 */
		premium: boolean;
		/**
		 * Deprecated key
		 *
		 * *No longer is being used*
		 */
		color: 0;
	}

	interface Argument {
		/**
		 * The name of the argument
		 */
		name: string;
		/**
		 * The description of the argument
		 */
		description?: string;
		/**
		 * The type of the argument
		 */
		type: ArgumentType;
		/**
		 * Whether the argument is required
		 */
		required: boolean;
		/**
		 * Whether the argument can be repeated
		 */
		repeatable?: boolean;
		/**
		 * Whether the argument can be empty
		 */
		empty?: boolean;
		/**
		 * The Enums of the argument.
		 */
		enumData?: any;
	}

	type ArgumentType =
		| "Bool"
		| "URL | String"
		| "String"
		| "Enum"
		| "Emoji"
		| "Snowflake"
		| "URL"
		| "Integer"
		| "Float | String | Integer"
		| "HowMany"
		| "Tuple"
		| "Snowflake | String"
		| "Permission"
		| "Color"
		| "Duration"
		| "Integer | Float"
		| "String | URL"
		| "String | Snowflake"
		| "Float | Bool | Integer | String"
		| "Float | Integer | String"
		| "String | Bool | Integer | Float"
		| "HowMany | String"
		| "Float | Integer"
		| "Float";

	namespace ArgumentEnums {
		type AddButton = readonly [
			"primary",
			"secondary",
			"success",
			"danger",
			"link"
		];
		type Modal = readonly ["short", "paragraph"];
		type Category = readonly ["count", "name", "id", "mention"];
		type Channel = readonly ["text", "voice", "category", "stage", "forum"];
		type EditButton = readonly [
			"primary",
			"secondary",
			"success",
			"danger",
			"link"
		];
		type Error = readonly ["row", "column", "command", "source", "message"];
		type Cooldown = readonly ["normal", "global", "server"];
		type EmbedData = readonly [
			"description",
			"footer",
			"color",
			"image",
			"timestamp",
			"title"
		];
		type InviteInfo = readonly [
			"uses",
			"channel",
			"creationDate",
			"inviter",
			"isTemporary"
		];
		type LeaderboardType = readonly ["user", "server", "globalUser"];
		type Sort = readonly ["desc", "asc"];
		type LeaderboardReturnType = readonly ["id", "value"];
		type MessageData = readonly [
			"content",
			"authorID",
			"username",
			"avatar"
		];
		type Timestamp = readonly ["ns", "ms", "s"];
		type MembersCount = readonly [
			"invisible",
			"dnd",
			"online",
			"offline",
			"idle"
		];
		type Url = readonly ["decode", "encode"];
		type VariablesCount = readonly [
			"channel",
			"user",
			"server",
			"globaluser"
		];
	}
}

export declare namespace Callback {
	interface Info {
		/**
		 * The name (tag-name) of the callback
		 */
		name: string;
		/**
		 * The description of the callback
		 */
		description: string;
		/**
		 * The arguments of the callback
		 */
		args: Argument[] | [];
		/**
		 * The intents of the callback
		 */
		intents: Intents;
		/**
		 * Whether the callback requires premium hosting time
		 */
		premium: boolean;
	}

	interface Response {
		/**
		 * The name of the callback
		 */
		name: string;
		/**
		 * The description of the callback
		 */
		description: string;
		/**
		 * The arguments of the callback
		 */
		arguments: Argument[] | null;
		/**
		 * The intents of the callback
		 *
		 * 0 = None
		 *
		 * 2 = Members
		 *
		 * 256 = Presence
		 */
		intents: RawIntents;
		/**
		 * Whether the callback requires premium hosting time
		 */
		is_premium: boolean;
	}

	interface Argument {
		/**
		 * The name of the argument
		 */
		name: string;
		/**
		 * The description of the argument
		 */
		description: string;
		/**
		 * The type of the argument
		 */
		type: ArgumentType;
		/**
		 * Whether the argument is required
		 */
		required: boolean;
	}

	type ArgumentType = "String" | "Snowflake";
}

type PartialTag = string;
type TagArray = string[];
type WrapperTarget = "function" | "callback";
type Endpoint = "info" | "list" | "tag-list";

export class Wrapper {
	private target: WrapperTarget;

	constructor(target: WrapperTarget) {
		this.target = target;
	}

	private async findByPartialTag(
		target: WrapperTarget,
		tag: string
	): Promise<string | undefined> {
		let tagList: string[];

		switch (target) {
			case "function":
				tagList = await new Wrapper("function").fetch("tag-list");
				break;
			case "callback":
				tagList = await new Wrapper("callback").fetch("tag-list");
				break;
		}

		for (const t of tagList) {
			if (t.includes(tag)) return t;
		}
	}

	private buildInfo(
		target: WrapperTarget,
		response: Function.Response | Callback.Response
	) {
		switch (target) {
			case "function":
				const {
					tag,
					shortDescription,
					premium,
					intents: functionIntents,
					arguments: functionArguments,
				} = <Function.Response>response;

				return <Function.Info>{
					tag,
					description: shortDescription,
					args: functionArguments,
					intents: HumanizeIntents(functionIntents),
					premium,
				};
			case "callback":
				const {
					name,
					description,
					is_premium,
					intents: callbackIntents,
					arguments: callbackArguments,
				} = <Callback.Response>response;

				return <Callback.Info>{
					name,
					description,
					args: callbackArguments,
					intents: HumanizeIntents(callbackIntents),
					premium: is_premium,
				};
		}
	}

	private async fetch(
		endpoint: "info",
		tag: string
	): Promise<Function.Response | Callback.Response>;
	private async fetch(
		endpoint: "list"
	): Promise<Function.Response[] | Callback.Response[]>;
	private async fetch(endpoint: "tag-list"): Promise<TagArray>;

	private async fetch(endpoint: Endpoint, tag: string = "") {
		switch (this.target) {
			case "function":
				switch (endpoint) {
					case "info":
						return await this.findByPartialTag(
							"function",
							tag
						).then(
							async (
								completedTag
							): Promise<Function.Response> => {
								if (!completedTag)
									throw new Error(
										`Failed to find function by partial tag "${tag}": resulted in "${completedTag}"`
									);
								return await (
									await centra(
										Api +
											EndpointPath.function.info +
											completedTag
									).send()
								).json();
							}
						);
					case "list":
						return <Function.Response[]>(
							await (
								await centra(
									Api + EndpointPath.function.list
								).send()
							).json()
						);
					case "tag-list":
						return <TagArray>(
							await (
								await centra(
									Api + EndpointPath.function.tagList
								).send()
							).json()
						);
				}
			case "callback":
				switch (endpoint) {
					case "info":
						return await this.findByPartialTag(
							"callback",
							tag
						).then(
							async (completedTag): Promise<Callback.Response> =>
								await (
									await centra(
										Api +
											EndpointPath.callback.info +
											completedTag
									).send()
								).json()
						);
					case "list":
						return <Callback.Response[]>(
							await (
								await centra(
									Api + EndpointPath.callback.list
								).send()
							).json()
						);
					case "tag-list":
						return <TagArray>(
							await (
								await centra(
									Api + EndpointPath.callback.tagList
								).send()
							).json()
						);
				}
			default:
				throw new Error(
					`Target "${this.target}" does not exist! Available targets: "function", "callback".`
				);
		}
	}

	/**
	 *
	 * Makes request to function-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 * @param tag A function tag, it can even be written partially
	 */
	public async function(
		endpoint: "info",
		tag: PartialTag
	): Promise<Function.Info>;
	/**
	 *
	 * Makes request to function-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 */
	public async function(endpoint: "list"): Promise<Function.Info[]>;
	/**
	 *
	 * Makes request to function-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 */
	public async function(endpoint: "tag-list"): Promise<TagArray>;

	public async function(endpoint: Endpoint, tag: PartialTag = "") {
		if (this.target === "callback")
			throw new Error(
				`Cannot use "${this.function.name}" method when target is "${this.target}"!`
			);

		switch (endpoint) {
			case "info":
				return this.buildInfo(
					this.target,
					await this.fetch("info", tag)
				);
			case "list":
				return await this.fetch("list").then((data) => {
					const list: Function.Info[] = [];

					for (const response of data) {
						list.push(
							<Function.Info>this.buildInfo(this.target, response)
						);
					}

					return list;
				});
			case "tag-list":
				return await this.fetch("tag-list");
		}
	}

	/**
	 *
	 * Makes request to callback-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 * @param tag A function tag, it can even be written partially
	 */
	public async callback(
		endpoint: "info",
		tag: PartialTag
	): Promise<Callback.Info>;
	/**
	 *
	 * Makes request to callback-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 */
	public async callback(endpoint: "list"): Promise<Callback.Info[]>;
	/**
	 *
	 * Makes request to callback-related endpoints
	 *
	 * @param endpoint The endpoint to make the request to
	 */
	public async callback(endpoint: "tag-list"): Promise<TagArray>;

	public async callback(endpoint: Endpoint, tag: PartialTag = "") {
		if (this.target === "function")
			throw new Error(
				`Cannot use "${this.callback.name}" method when target is "${this.target}"!`
			);

		switch (endpoint) {
			case "info":
				return this.buildInfo(
					this.target,
					await this.fetch("info", tag)
				);
			case "list":
				return await this.fetch("list").then((data) => {
					const list: Callback.Info[] = [];

					for (const response of data) {
						list.push(
							<Callback.Info>this.buildInfo(this.target, response)
						);
					}

					return list;
				});
			case "tag-list":
				return await this.fetch("tag-list");
		}
	}
}
