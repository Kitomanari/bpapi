> [!NOTE]
> This is the fifth iteration of the package.

The code base was fully rewritten from scratch, and support for Nodes endpoint was removed due to compatibility issues in some bundled projects caused by jsdom, replacement of which I could not find.

Anyways, here are quick examples of using the new version, breaking changes are applied for it, but responses remain the same.

# Examples

Of course, you have to import the wrapper first:
```ts
import { Wrapper } from "@synthexia/bpapi-wrapper";
```

## Function Info Endpoint

```ts
new Wrapper("function")
	.function("info", "$addS")
	.then((info) => {
		// Work with the response
	})
	.catch((r) => {
		// Catch an error
	});
```

```json
{
	"tag": "$addSelectMenuOption[Menu option ID;Label;Value;Description;(Default;Emoji;Message ID)]",
	"description": "Adds select menu option to a select menu. Check wiki for examples.",
	"args": [
		{
			"name": "Menu option ID",
			"type": "String",
			"required": true
		},
		{
			"name": "Label",
			"type": "String",
			"required": true
		},
		{
			"name": "Value",
			"type": "String",
			"required": true
		},
		{
			"name": "Description",
			"type": "String",
			"required": true,
			"empty": true
		},
		{
			"name": "Default",
			"type": "Bool",
			"required": false,
			"empty": true
		},
		{
			"name": "Emoji",
			"type": "Emoji",
			"required": false,
			"empty": true
		},
		{
			"name": "Message ID",
			"type": "String",
			"required": false,
			"empty": true
		}
	],
	"intents": "None",
	"premium": false
}
```

## Callback List Endpoint

```ts
new Wrapper("callback")
	.callback("list")
	.then((list) => {
		// Work with the response
	})
	.catch((r) => {
		// Catch an error
	});
```

```json
[
	{
		"name": "$onJoined[channel ID]",
		"description": "Triggers command when user joins server",
		"args": [
			{
				"name": "Channel ID",
				"description": "Channel ID of the welcome channel",
				"type": "Snowflake",
				"required": true
			}
		],
		"intents": "Members",
		"premium": false
	},
	{
		"name": "$onLeave[channel ID]",
		"description": "Triggers command when user leaves server",
		"args": [
			{
				"name": "Channel ID",
				"description": "Channel ID of the leave channel",
				"type": "Snowflake",
				"required": true
			}
		],
		"intents": "Members",
		"premium": false
	},
	{
		"name": "$onMessageDelete[channel ID]",
		"description": "Triggers command when user deletes message",
		"args": [
			{
				"name": "Channel ID",
				"description": "Channel ID of the log channel",
				"type": "Snowflake",
				"required": true
			}
		],
		"intents": "None",
		"premium": false
	},
	{
		"name": "$onBanAdd[channel ID]",
		"description": "Triggers command when user is banned from the server",
		"args": [
			{
				"name": "Channel ID",
				"description": "Channel ID of the log channel",
				"type": "Snowflake",
				"required": true
			}
		],
		"intents": "None",
		"premium": false
	},
	{
		"name": "$onBanRemove[channel ID]",
		"description": "Triggers command when user is unbanned from the server",
		"args": [
			{
				"name": "Channel ID",
				"description": "Channel ID of the log channel",
				"type": "Snowflake",
				"required": true
			}
		],
		"intents": "None",
		"premium": false
	},
	{
		"name": "$alwaysReply",
		"description": "Makes command get triggered by every message",
		"args": [],
		"intents": "None",
		"premium": true
	},
	{
		"name": "$messageContains[word;...]",
		"description": "Command gets triggered every time message contains one of the provided words",
		"args": [
			{
				"name": "Word",
				"type": "String",
				"required": true
			}
		],
		"intents": "None",
		"premium": true
	},
	{
		"name": "$awaitedCommand[name;(filter)]",
		"description": "Used for awaited functions.",
		"args": [
			{
				"name": "Name",
				"description": "Awaited command name",
				"type": "String",
				"required": true
			},
			{
				"name": "Filter",
				"description": "Awaited command filter",
				"type": "String",
				"required": false
			}
		],
		"intents": "None",
		"premium": false
	},
	{
		"name": "$reaction[name]",
		"description": "Used for awaited reactions.",
		"args": [
			{
				"name": "Name",
				"description": "Awaited reaction name",
				"type": "String",
				"required": true
			}
		],
		"intents": "None",
		"premium": true
	},
	{
		"name": "$onInteraction[custom ID]",
		"description": "Triggered by a component interaction. For example: a user pressing a button",
		"args": [
			{
				"name": "Custom ID",
				"description": "Custom ID assigned to that interaction",
				"type": "String",
				"required": true
			}
		],
		"intents": "None",
		"premium": false
	},
	{
		"name": "$onInteraction",
		"description": "Triggered by a component interaction. For example: a user pressing a button",
		"args": [],
		"intents": "None",
		"premium": false
	}
]
```
