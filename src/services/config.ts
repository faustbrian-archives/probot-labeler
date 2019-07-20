import { getConfig } from "@botamic/toolkit";
import Joi from "@hapi/joi";
import { Context } from "probot";

export const loadConfig = async (context: Context): Promise<Record<string, any>> =>
	getConfig(
		context,
		Joi.object({
			labeler: Joi.object()
				.pattern(
					Joi.string(),
					Joi.object({
						pattern: Joi.string(),
						label: Joi.string(),
					}),
				)
				.default(),
		})
			.unknown(true)
			.default(),
	);
