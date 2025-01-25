import { Intents, RawIntents } from "./enums";

export function HumanizeIntents(raw: RawIntents): Intents {
	switch (raw) {
		case RawIntents.Presence:
			return Intents.Presence;
		case RawIntents.Members:
			return Intents.Members;
		default:
			return Intents.None;
	}
}
